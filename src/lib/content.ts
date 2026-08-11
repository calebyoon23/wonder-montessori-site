/**
 * src/lib/content.ts
 * Editorial content that is part of the site design rather than owner-editable data.
 *
 * Everything factual here traces to the WMS Parent Handbook (Rev. 08/24).
 * Montessori quotations are attributed to Dr. Maria Montessori.
 */

// ─── Montessori quotations ───────────────────────────────────────────────────
// One per page, used as a pull-quote. Deliberately sparse — four across the site.

export interface Quote {
  text: string;
  attribution: string;
}

export const QUOTES: Record<'home' | 'about' | 'programs' | 'tour', Quote> = {
  home: {
    text: 'The goal of early childhood education should be to activate the child’s own natural desire to learn.',
    attribution: 'Maria Montessori',
  },
  about: {
    text: 'The child is both a hope and a promise for mankind.',
    attribution: 'Maria Montessori',
  },
  programs: {
    text: 'The education of even a small child, therefore, does not aim at preparing him for school, but for life.',
    attribution: 'Maria Montessori',
  },
  tour: {
    text: 'Free the child’s potential, and you will transform him into the world.',
    attribution: 'Maria Montessori',
  },
};

// ─── Curriculum ──────────────────────────────────────────────────────────────
// Mirrors the "Daily Activities" list in the Parent Handbook curriculum section.

export const CURRICULUM_AREAS = [
  {
    title: 'Practical Life',
    body: 'Pouring, spooning, scooping, dish washing, and hand washing. Real work with real tools builds coordination, concentration, and the independence every later skill rests on.',
  },
  {
    title: 'Language',
    body: 'Learning sounds, building words, and recognizing the alphabet, supported by storytelling, song, and the rich vocabulary of everyday classroom life.',
  },
  {
    title: 'Mathematics & STEM',
    body: 'Number recognition, counting, and tracing lead into the Montessori materials that make quantity tangible. STEM thinking grows from the same root: observe, predict, test, and try again.',
  },
  {
    title: 'Sensorial',
    body: 'Matching, grading, and ordering: big to small, heavy to light, rough to smooth. Children refine each sense and, in doing so, learn to notice difference precisely.',
  },
  {
    title: 'Science & Nature',
    body: 'Environments, life cycles, weather, and the parts of animals and plants, explored through observation rather than worksheets.',
  },
  {
    title: 'Creative Arts',
    body: 'Painting, drawing, coloring, pasting, singing, dancing, and music. The arts run through the whole day rather than sitting in a slot of their own.',
  },
];

// ─── Credentials & affiliations ──────────────────────────────────────────────

export const CREDENTIALS = [
  {
    title: 'Montessori Credentials',
    body: 'Our head directresses are certified by accredited educational institutions, and every classroom head teacher either holds a Montessori credential or is undertaking Montessori training certification.',
  },
  {
    title: 'Early Childhood Education',
    body: 'Teachers hold Early Childhood Education credentials, and staff beginning Montessori studies are required to have an academic degree and experience in early childhood education.',
  },
  {
    title: 'Ongoing Training',
    body: 'Staff train annually and monthly on school policy and practice, and take part in continued learning on early childhood development.',
  },
  {
    title: 'Safety Certified',
    body: 'Head staff and much of the assistant staff are CPR certified, First Aid trained, and Choking/Heimlich trained, as well as trained in food preparation and sanitation.',
  },
];

