/**
 * src/lib/queries.ts
 * GROQ queries for Sanity, plus fallback data used when Sanity is not configured.
 *
 * SOURCE OF TRUTH
 * ---------------
 * Every fact below is taken from one of two documents. Do not change these
 * values without checking them against the current revision of:
 *   · WMS Parent Handbook (Rev. 08/24)  — contact, hours, policies, curriculum
 *   · WMS Tuition Plans, Academic Year 2026–2027 — all tuition figures
 *
 * To swap in real data: configure SANITY_PROJECT_ID in .env and populate Sanity Studio.
 */

// ─── GROQ Queries ────────────────────────────────────────────────────────────

export const Q = {
  siteInfo: `*[_type == "siteInfo"][0]`,
  programs: `*[_type == "program"] | order(order asc) {
    name, slug, ageRange, plans, heroImage
  }`,
  staff:    `*[_type == "staff"]   | order(order asc) { name, title, bio, photo }`,
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SiteInfo {
  /** Short brand name used in the nav and page titles. */
  schoolName: string;
  /** Full legal name, used in the footer and legal/nonprofit copy. */
  legalName: string;
  tagline: string;
  /** Campus address shown across the site. */
  address: string;
  cityState: string;
  phone: string;
  fax: string;
  email: string;
  hours: string;
  established: string;
  formspreeId: string;
  /** Public Google Calendar ID powering the Calendar page. */
  calendarId: string;
  /** IANA timezone used by the Google Calendar embed. */
  timezone: string;
}

export interface TuitionPlan {
  /** e.g. "5 Full Days" */
  label: string;
  /** e.g. "7:00 AM – 6:00 PM" */
  hours: string;
  /** Monthly tuition, formatted for display. */
  price: string;
}

export interface Program {
  slug: string;
  name: string;
  ageRange: string;
  plans: TuitionPlan[];
  heroImage?: { asset?: { _ref?: string } };
  /** Fallback local path used when Sanity is not configured. */
  localImage?: string;
}

export interface StaffMember {
  name: string;
  title: string;
  bio: string;
  photo?: { asset?: { _ref?: string } };
}

// ─── Fallback Data (used when Sanity is not yet configured) ──────────────────

export const FALLBACK: {
  siteInfo: SiteInfo;
  programs: Program[];
  staff: StaffMember[];
} = {
  siteInfo: {
    schoolName: 'Wonder Montessori',
    legalName: 'Wonder Montessori School',
    tagline: 'A place where every child belongs',
    address: '5622–5644 North Pulaski Road',
    cityState: 'Chicago, IL 60646',
    phone: '(773) 509-1296',
    fax: '773-337-6337',
    email: 'info@wondermontessori.org',
    hours: 'Monday – Friday, 7:00 AM – 6:00 PM',
    established: '1993',
    formspreeId: 'YOUR_FORMSPREE_ID',
    calendarId: 'wondermontessori60646@gmail.com',
    timezone: 'America/Chicago',
  },

  // Tuition figures below are verbatim from the 2026–2027 Tuition Plans document.
  programs: [
    {
      slug: 'infant-toddlers',
      name: 'Infant & Toddlers',
      ageRange: '3 months – 15 months',
      plans: [
        { label: '5 Full Days', hours: '7:00 AM – 6:00 PM', price: '$2,230' },
        { label: '4 Full Days', hours: '7:00 AM – 6:00 PM', price: '$2,155' },
        { label: '3 Full Days', hours: '7:00 AM – 6:00 PM', price: '$2,085' },
      ],
      localImage: '/images/infant.jpg',
    },
    {
      slug: 'toddler-twos',
      name: "Toddler & Two's",
      ageRange: '15 months – 36 months',
      plans: [
        { label: '5 Full Days', hours: '7:00 AM – 6:00 PM', price: '$2,000' },
        { label: '4 Full Days', hours: '7:00 AM – 6:00 PM', price: '$1,945' },
        { label: '3 Full Days', hours: '7:00 AM – 6:00 PM', price: '$1,845' },
        { label: '5 Half Days', hours: '8:30 AM – 12:00 PM', price: '$1,620' },
      ],
      localImage: '/images/toddler.jpg',
    },
    {
      slug: 'primary',
      name: '3–6 Primary',
      ageRange: '3 – 6 years',
      plans: [
        { label: '5 Full Days',           hours: '7:00 AM – 6:00 PM',  price: '$1,640' },
        { label: '4 Full Days',           hours: '7:00 AM – 6:00 PM',  price: '$1,585' },
        { label: '3 Full Days',           hours: '7:00 AM – 6:00 PM',  price: '$1,500' },
        { label: '5 Extended Half Days',  hours: '8:30 AM – 2:30 PM',  price: '$1,510' },
        { label: '3 Extended Half Days',  hours: '8:30 AM – 2:30 PM',  price: '$1,420' },
        { label: '5 Half Days',           hours: '8:30 AM – 12:00 PM', price: '$1,400' },
      ],
      localImage: '/images/primary.jpg',
    },
  ],

  staff: [
    {
      name: 'Dr. Gwen Ku',
      title: 'Co-Founder & Directress',
      bio: 'Educated in Seoul and the United States, Dr. Gwen Ku holds bachelor’s and master’s degrees in education and completed further training in the Montessori curriculum. After teaching in suburban Montessori schools and finding them short on the diversity she valued, she founded Wonder Montessori in October 1993.',
    },
    {
      name: 'Dr. Peter Ku',
      title: 'Co-Founder & Director',
      bio: 'Dr. Peter Ku holds bachelor’s and master’s degrees in education, earned in Seoul and the United States, and built a career in business before joining Gwen in founding the school. He leads Wonder Montessori’s administration and its long-term commitment to the families it serves.',
    },
  ],
};

// ─── Derived helpers ─────────────────────────────────────────────────────────

/** Full one-line address, e.g. "5622–5644 North Pulaski Road, Chicago, IL 60646". */
export function fullAddress(info: SiteInfo): string {
  return `${info.address}, ${info.cityState}`;
}

/** Lowest monthly price across a program's schedules, for "from $X" copy. */
export function lowestPrice(program: Program): string {
  const cheapest = program.plans.reduce((min, p) =>
    Number(p.price.replace(/[^0-9]/g, '')) < Number(min.price.replace(/[^0-9]/g, '')) ? p : min
  );
  return cheapest.price;
}
