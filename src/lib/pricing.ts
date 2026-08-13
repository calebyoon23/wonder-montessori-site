/**
 * src/lib/pricing.ts
 * The one owner-editable slice of the site: tuition.
 *
 * Resolution order for every price on the site:
 *   1. The "Tuition & Pricing" document in Sanity Studio, if Sanity is configured
 *      and the document has rows for that program.
 *   2. content/pricing.json, the checked-in fallback.
 *
 * Program names, age ranges, and photos are deliberately NOT part of this — an
 * admin editing tuition cannot change them. They live in src/lib/site.ts.
 */
import pricingJson from '../../content/pricing.json';
import { fetchSanity } from './sanity';
import { PROGRAMS, type ProgramInfo } from './site';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TuitionPlan {
  /** Schedule name, e.g. "5 Full Days". */
  label: string;
  /** e.g. "7:00 AM – 6:00 PM". May be blank. */
  hours: string;
  /** Monthly tuition, formatted for display, e.g. "$2,230". */
  price: string;
}

/** A program with its resolved tuition table attached. */
export interface PricedProgram extends ProgramInfo {
  plans: TuitionPlan[];
}

/**
 * Discount and fee footnotes shown beneath the tuition tables. These are part of
 * the price of attending, so they are editable alongside the figures themselves.
 * Any note left blank is simply not rendered.
 */
export interface TuitionNotes {
  annualDiscount: string;
  siblingDiscount: string;
  earlyDropOff: string;
  proration: string;
  registrationFees: string;
}

/** Display order and headings for the footnotes. Headings are design, not content. */
export const NOTE_FIELDS: Array<{ key: keyof TuitionNotes; label: string }> = [
  { key: 'annualDiscount',   label: 'Paying annually' },
  { key: 'siblingDiscount',  label: 'Siblings' },
  { key: 'earlyDropOff',     label: 'Early drop-off' },
  { key: 'proration',        label: 'Proration' },
  { key: 'registrationFees', label: 'Registration fees' },
];

export interface Tuition {
  /** e.g. "2026–2027". Shown above every tuition table. */
  academicYear: string;
  programs: PricedProgram[];
  notes: TuitionNotes;
}

// ─── Sanity ──────────────────────────────────────────────────────────────────

/** The tuition singleton. Its document id is fixed as `tuition` in the Studio. */
export const TUITION_QUERY = `*[_type == "tuition"][0]{
  academicYear,
  programs[]{ slug, plans[]{ label, hours, price } },
  notes{ annualDiscount, siblingDiscount, earlyDropOff, proration, registrationFees }
}`;

/** Shape returned by Sanity. Everything is optional — the Studio may be empty. */
export interface RemotePlan {
  label?: string;
  hours?: string;
  price?: string;
}

export interface RemoteTuition {
  academicYear?: string;
  programs?: Array<{ slug?: string; plans?: RemotePlan[] }>;
  notes?: Partial<Record<keyof TuitionNotes, string>>;
}

// ─── Fallback ────────────────────────────────────────────────────────────────

const FALLBACK_PLANS: Record<string, TuitionPlan[]> = Object.fromEntries(
  pricingJson.programs.map(p => [p.slug, p.plans]),
);

const FALLBACK_NOTES: TuitionNotes = pricingJson.notes;

// ─── Resolution ──────────────────────────────────────────────────────────────

/** Keep only rows that carry both a schedule name and a price. */
function usablePlans(plans: RemotePlan[] | undefined): TuitionPlan[] {
  return (plans ?? [])
    .filter((p): p is { label: string; hours?: string; price: string } =>
      Boolean(p?.label?.trim() && p?.price?.trim()))
    .map(p => ({ label: p.label.trim(), hours: p.hours?.trim() ?? '', price: p.price.trim() }));
}

/**
 * Overlay a Sanity tuition document onto the programs defined in code.
 *
 * Pure, and deliberately forgiving: falls back field by field and program by
 * program, so a half-filled or malformed Studio document can never blank out a
 * tuition table. Sanity blocks whose slug matches no program are ignored.
 */
export function mergeTuition(remote: RemoteTuition | null): Tuition {
  const programs = PROGRAMS.map(info => {
    const fromSanity = usablePlans(remote?.programs?.find(p => p?.slug === info.slug)?.plans);
    return {
      ...info,
      plans: fromSanity.length ? fromSanity : (FALLBACK_PLANS[info.slug] ?? []),
    };
  });

  // Notes follow a different rule from plans, on purpose. A blank tuition table
  // is a broken page, so plans always fall back. A missing footnote is not — so
  // once the Studio document has notes, it owns them outright and clearing one
  // in the Studio hides it, rather than resurrecting the checked-in text.
  const notes = (remote?.notes
    ? Object.fromEntries(
        NOTE_FIELDS.map(({ key }) => [key, remote.notes?.[key]?.trim() ?? '']),
      )
    : { ...FALLBACK_NOTES }) as TuitionNotes;

  return {
    academicYear: remote?.academicYear?.trim() || pricingJson.academicYear,
    programs,
    notes,
  };
}

/** Tuition for the current build: Sanity if configured and reachable, else the fallback. */
export async function getTuition(): Promise<Tuition> {
  return mergeTuition(await fetchSanity<RemoteTuition | null>(TUITION_QUERY, null));
}

// ─── Derived helpers ─────────────────────────────────────────────────────────

const numeric = (price: string) => Number(price.replace(/[^0-9.]/g, ''));

/** Lowest monthly price across a program's schedules, for "from $X" copy. */
export function lowestPrice(program: PricedProgram): string {
  if (!program.plans.length) return '';
  return program.plans.reduce((min, p) => (numeric(p.price) < numeric(min.price) ? p : min)).price;
}
