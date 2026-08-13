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
 *
 * The tuition tables are the whole of it: no footnotes, discounts, or fee copy
 * are rendered on the site. content/pricing.json still records those policies for
 * reference, but nothing reads them.
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

export interface Tuition {
  /** e.g. "2026–2027". Shown above every tuition table. */
  academicYear: string;
  programs: PricedProgram[];
}

// ─── Sanity ──────────────────────────────────────────────────────────────────

/** The tuition singleton. Its document id is fixed as `tuition` in the Studio. */
export const TUITION_QUERY = `*[_type == "tuition"][0]{
  academicYear,
  programs[]{ slug, plans[]{ label, hours, price } }
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
}

// ─── Fallback ────────────────────────────────────────────────────────────────

const FALLBACK_PLANS: Record<string, TuitionPlan[]> = Object.fromEntries(
  pricingJson.programs.map(p => [p.slug, p.plans]),
);

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

  return {
    academicYear: remote?.academicYear?.trim() || pricingJson.academicYear,
    programs,
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
