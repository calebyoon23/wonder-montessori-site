/**
 * src/lib/site.ts
 * Static site data — the parts of the site that are NOT owner-editable.
 *
 * School details are read straight out of content/site-info.json so there is a
 * single copy of every fact (verified against the WMS Parent Handbook, Rev. 08/24).
 * Program identity — name, age range, slug, meal policy — lives here in code
 * because it changes with the school's programs, not with a price list.
 *
 * The ONLY thing an admin edits through Sanity is tuition. See src/lib/pricing.ts.
 */
import siteInfoJson from '../../content/site-info.json';

// ─── School information ──────────────────────────────────────────────────────

export type SiteInfo = typeof siteInfoJson;

export const SITE: SiteInfo = siteInfoJson;

/** Full one-line address, e.g. "5622–5644 North Pulaski Road, Chicago, IL 60646". */
export function fullAddress(info: SiteInfo = SITE): string {
  return `${info.address}, ${info.cityState}`;
}

// ─── Program identity ────────────────────────────────────────────────────────

export interface ProgramInfo {
  /** Anchor id and Sanity key. One of: infant-toddlers, toddler-twos, primary. */
  slug: string;
  name: string;
  ageRange: string;
  /** Meal and readiness policy, from the Parent Handbook. */
  mealNote: string;
}

/**
 * The three programs, youngest first. Display order is this array's order.
 * Slugs are the contract between this file, PROGRAM_PHOTOS in images.ts, the
 * pricing data in content/pricing.json, and the Sanity tuition document.
 */
export const PROGRAMS: ProgramInfo[] = [
  {
    slug: 'infant-toddlers',
    name: 'Infant & Toddlers',
    ageRange: '3 – 15+ months',
    mealNote:
      'Families provide food, milk, or formula for infants. Once a child reaches 15 months ' +
      'and is eating solid foods, a catered organic lunch is served with parental approval.',
  },
  {
    slug: 'toddler-twos',
    name: "Toddler & Two's",
    ageRange: '15 – 36+ months',
    mealNote: 'All schedules include catered organic lunches and snacks.',
  },
  {
    slug: 'primary',
    name: '3–6 Primary',
    ageRange: '3 – 6 years',
    mealNote:
      'All schedules include catered organic lunches and snacks. Children must be fully ' +
      'potty-trained for this program.',
  },
];

// ─── Founders ────────────────────────────────────────────────────────────────

export interface Person {
  name: string;
  title: string;
  bio: string;
}

/** Shown on the About page. Biographies trace to the Parent Handbook. */
export const FOUNDERS: Person[] = [
  {
    name: 'Dr. Gwen Ku',
    title: 'Co-Founder & Directress',
    bio: 'Educated in Seoul and the United States, Dr. Gwen Ku holds bachelor’s and doctorate degrees in education and completed further training in the Montessori curriculum. After teaching in suburban Montessori schools and finding them short on the diversity she valued, she founded Wonder Montessori in October 1993.',
  },
  {
    name: 'Dr. Peter Ku',
    title: 'Co-Founder',
    bio: 'Dr. Peter Ku holds bachelor’s and doctorate degrees in education, earned in Seoul and the United States, and built a career in business before joining Gwen in founding the school. He leads Wonder Montessori’s administration and its long-term commitment to the families it serves.',
  },
];
