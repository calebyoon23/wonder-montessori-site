/**
 * src/lib/queries.ts
 * GROQ queries for Sanity, plus fallback data used when Sanity is not configured.
 * To swap in real data: configure SANITY_PROJECT_ID in .env and populate Sanity Studio.
 */

// ─── GROQ Queries ────────────────────────────────────────────────────────────

export const Q = {
  siteInfo: `*[_type == "siteInfo"][0]`,
  events:   `*[_type == "event"] | order(date asc) { title, date, time, description, highlight }`,
  programs: `*[_type == "program"] | order(order asc) { name, ageRange, price, schedule, notes, heroImage }`,
  staff:    `*[_type == "staff"]   | order(order asc) { name, title, bio, photo }`,
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SiteInfo {
  schoolName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  established: string;
  formspreeId: string;
}

export interface Event {
  title: string;
  date: string;       // YYYY-MM-DD
  time: string;
  description: string;
  highlight: boolean;
}

export interface Program {
  name: string;
  ageRange: string;
  price: string;
  schedule: string;
  notes: string;
  heroImage?: { asset?: { _ref?: string } };
  localImage?: string; // fallback local path
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
  events: Event[];
  programs: Program[];
  staff: StaffMember[];
} = {
  siteInfo: {
    schoolName: 'Wonder Montessori',
    tagline: 'A place where every child belongs',
    address: '5644 North Pulaski Road, Chicago, IL 60646',
    phone: '(773) 509-1296',
    email: 'info@wondermontessori.org',
    hours: 'Monday – Friday, 7:00 AM – 6:00 PM',
    established: '1993',
    formspreeId: 'YOUR_FORMSPREE_ID',
  },

  events: [
    {
      title: 'Summer Open House',
      date: '2026-06-10',
      time: '10:00 AM – 12:00 PM',
      description: 'Come meet our teachers, explore our classrooms, and learn about our Montessori philosophy. All families welcome.',
      highlight: true,
    },
    {
      title: 'Parent Information Evening',
      date: '2026-06-18',
      time: '6:30 PM – 8:00 PM',
      description: 'An evening session for prospective families to learn about our programs, curriculum, and enrollment process.',
      highlight: false,
    },
    {
      title: 'Garden Planting Day',
      date: '2026-06-25',
      time: '9:00 AM – 11:00 AM',
      description: 'Families are invited to join us for a morning of planting and tending to our school garden together.',
      highlight: false,
    },
    {
      title: 'Fall Enrollment Opens',
      date: '2026-07-01',
      time: 'All Day',
      description: 'Fall 2026 enrollment opens for new and returning families. Schedule a tour to secure your spot.',
      highlight: true,
    },
    {
      title: 'Music & Movement Morning',
      date: '2026-07-15',
      time: '9:30 AM – 10:30 AM',
      description: 'A family-friendly morning of singing, movement, and musical exploration. Open to children of all ages.',
      highlight: false,
    },
    {
      title: 'End-of-Summer Celebration',
      date: '2026-08-28',
      time: '2:00 PM – 4:00 PM',
      description: 'Celebrate our summer families and welcome our new fall families with food, art displays, and community time.',
      highlight: true,
    },
  ],

  programs: [
    {
      name: 'Infant Program',
      ageRange: '6 weeks – 18 months',
      price: '$2,400 / month',
      schedule: 'Full-day · 7:00 AM – 6:00 PM',
      notes: 'Half-day options available. Responsive, individualized care in a calm home-like environment.',
      localImage: '/images/infant.jpg',
    },
    {
      name: "Toddler & Two's",
      ageRange: '18 months – 3 years',
      price: '$2,100 / month',
      schedule: 'Full-day · 7:00 AM – 6:00 PM',
      notes: 'Half-day mornings also available. Language-rich, movement-focused Montessori environment.',
      localImage: '/images/toddler.jpg',
    },
    {
      name: 'Primary (3–6)',
      ageRange: '3 – 6 years',
      price: '$1,900 / month',
      schedule: 'Full-day · 7:00 AM – 6:00 PM',
      notes: 'Half-day (8:30 AM – 12:00 PM) available at $1,200/month. Mixed-age Montessori classroom.',
      localImage: '/images/primary.jpg',
    },
    {
      name: 'Summer Program',
      ageRange: 'All ages',
      price: '$1,600 / month',
      schedule: 'June – August · 7:00 AM – 6:00 PM',
      notes: 'Weekly enrichment themes, outdoor exploration, and seasonal activities. Enroll independently or as add-on.',
      localImage: '/images/summer.jpg',
    },
  ],

  staff: [
    {
      name: 'Dr. Gwen Ku',
      title: 'Co-Founder & Montessori Director',
      bio: 'After completing formal Montessori training and earning her doctorate in education, Dr. Gwen Ku opened Wonder Montessori in October 1993 with a vision of inclusive, high-quality early childhood education for all Chicago families.',
    },
    {
      name: 'Dr. Peter Ku',
      title: 'Co-Founder & Director',
      bio: 'Holding a doctorate in education, Dr. Peter Ku joined Dr. Gwen Ku in building Wonder Montessori — providing leadership, administrative vision, and an unwavering commitment to the school\'s founding values.',
    },
  ],
};
