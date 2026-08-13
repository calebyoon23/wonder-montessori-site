/**
 * Sanity schema: Tuition & Pricing
 *
 * This is the ONLY editable document in the Studio, and it is a singleton
 * (document id `tuition`). It holds tuition figures and nothing else.
 *
 * Program identity — name, age range, photo, description — is intentionally not
 * here. Those live in the site's code (src/lib/site.ts) so that an admin editing
 * prices cannot restructure the site. The `slug` field below is the join key and
 * is read-only for that reason.
 *
 * The initialValue block seeds the document the first time it is created so the
 * admin opens a filled-in table rather than a blank form. It mirrors
 * content/pricing.json, which is the site's offline fallback. After creation the
 * Studio is the live source of truth and the two are expected to diverge.
 */
import { defineType, defineField, defineArrayMember } from 'sanity';

/** The three programs the site renders, in display order. Slugs must match src/lib/site.ts. */
const PROGRAM_SLUGS = [
  { title: 'Infant & Toddlers (3–15+ months)', value: 'infant-toddlers' },
  { title: "Toddler & Two's (15–36+ months)",  value: 'toddler-twos' },
  { title: '3–6 Primary (3–6+ years)',         value: 'primary' },
];

export const tuitionSchema = defineType({
  name: 'tuition',
  title: 'Tuition & Pricing',
  type: 'document',
  icon: () => '💵',
  fields: [
    defineField({
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      description: 'Shown above every tuition table on the site. e.g. 2026–2027',
      validation: r => r.required(),
    }),

    defineField({
      name: 'programs',
      title: 'Tuition by Program',
      type: 'array',
      description:
        'One block per program. The program itself cannot be renamed or removed here — ' +
        'only its schedules and prices.',
      validation: r => r.max(PROGRAM_SLUGS.length),
      of: [defineArrayMember({
        type: 'object',
        name: 'programTuition',
        fields: [
          defineField({
            name: 'slug',
            title: 'Program',
            type: 'string',
            readOnly: true,
            options: { list: PROGRAM_SLUGS },
            description: 'Set by the site. Not editable.',
            validation: r => r.required(),
          }),
          defineField({
            name: 'plans',
            title: 'Schedules & Monthly Tuition',
            type: 'array',
            description: 'One row per schedule option, in the order they should appear.',
            validation: r => r.min(1).error('Every program needs at least one price row.'),
            of: [defineArrayMember({
              type: 'object',
              name: 'plan',
              fields: [
                defineField({
                  name: 'label', title: 'Schedule', type: 'string',
                  description: 'e.g. 5 Full Days',
                  validation: r => r.required(),
                }),
                defineField({
                  name: 'hours', title: 'Hours', type: 'string',
                  description: 'e.g. 7:00 AM – 6:00 PM',
                }),
                defineField({
                  name: 'price', title: 'Monthly Tuition', type: 'string',
                  description: 'Include the dollar sign and comma, e.g. $2,230',
                  // A warning, not an error: an unusual format should never block publishing.
                  validation: r => [
                    r.required(),
                    r.regex(/^\$[\d,]+$/).warning(
                      'Prices normally look like $2,230 — dollar sign, digits, and commas.'),
                  ],
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'price' } },
            })],
          }),
        ],
        preview: {
          select: { slug: 'slug', plans: 'plans' },
          prepare: ({ slug, plans }) => ({
            title: PROGRAM_SLUGS.find(p => p.value === slug)?.title ?? slug,
            subtitle: `${plans?.length ?? 0} schedule${plans?.length === 1 ? '' : 's'}`,
          }),
        },
      })],
    }),

    defineField({
      name: 'notes',
      title: 'Discounts & Fees',
      type: 'object',
      description:
        'Shown as footnotes underneath the tuition tables on the Programs page. ' +
        'Leave a field empty to hide that note from the site entirely.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'annualDiscount', title: 'Paying annually', type: 'text', rows: 2,
          description: 'e.g. Paying annually represents a 5% discount off monthly tuition.',
        }),
        defineField({
          name: 'siblingDiscount', title: 'Siblings', type: 'text', rows: 2,
          description: 'e.g. 10% discount applied to the tuition of the child with the lower rate.',
        }),
        defineField({
          name: 'earlyDropOff', title: 'Early drop-off', type: 'text', rows: 2,
          description: 'The additional fee, and which schedules it applies to.',
        }),
        defineField({
          name: 'proration', title: 'Proration', type: 'text', rows: 2,
          description: 'Whether tuition is prorated for absences or closing days.',
        }),
        defineField({
          name: 'registrationFees', title: 'Registration fees', type: 'text', rows: 3,
          description:
            'Application fee, family fee, and security deposit. If the amounts are now ' +
            'public, put them here — families ask about this constantly.',
        }),
      ],
    }),
  ],

  preview: {
    select: { subtitle: 'academicYear' },
    prepare: ({ subtitle }) => ({ title: 'Tuition & Pricing', subtitle }),
  },

  // Seed used only on first creation. Mirrors content/pricing.json.
  initialValue: {
    academicYear: '2026–2027',
    programs: [
      {
        _type: 'programTuition',
        slug: 'infant-toddlers',
        plans: [
          { _type: 'plan', label: '5 Full Days', hours: '7:00 AM – 6:00 PM', price: '$2,230' },
          { _type: 'plan', label: '4 Full Days', hours: '7:00 AM – 6:00 PM', price: '$2,155' },
          { _type: 'plan', label: '3 Full Days', hours: '7:00 AM – 6:00 PM', price: '$2,085' },
        ],
      },
      {
        _type: 'programTuition',
        slug: 'toddler-twos',
        plans: [
          { _type: 'plan', label: '5 Full Days', hours: '7:00 AM – 6:00 PM',  price: '$2,000' },
          { _type: 'plan', label: '4 Full Days', hours: '7:00 AM – 6:00 PM',  price: '$1,945' },
          { _type: 'plan', label: '3 Full Days', hours: '7:00 AM – 6:00 PM',  price: '$1,845' },
          { _type: 'plan', label: '5 Half Days', hours: '8:30 AM – 12:00 PM', price: '$1,620' },
        ],
      },
      {
        _type: 'programTuition',
        slug: 'primary',
        plans: [
          { _type: 'plan', label: '5 Full Days',          hours: '7:00 AM – 6:00 PM',  price: '$1,640' },
          { _type: 'plan', label: '4 Full Days',          hours: '7:00 AM – 6:00 PM',  price: '$1,585' },
          { _type: 'plan', label: '3 Full Days',          hours: '7:00 AM – 6:00 PM',  price: '$1,500' },
          { _type: 'plan', label: '5 Extended Half Days', hours: '8:30 AM – 2:30 PM',  price: '$1,510' },
          { _type: 'plan', label: '3 Extended Half Days', hours: '8:30 AM – 2:30 PM',  price: '$1,420' },
          { _type: 'plan', label: '5 Half Days',          hours: '8:30 AM – 12:00 PM', price: '$1,400' },
        ],
      },
    ],
    notes: {
      annualDiscount: 'Paying annually represents a 5% discount off monthly tuition.',
      siblingDiscount: '10% discount applied to the tuition of the child with the lower rate.',
      earlyDropOff:
        'For the school day program, early drop-offs before 8:30 AM may be arranged with ' +
        'the school for an additional fee.',
      proration:
        'Tuition is not prorated. Monthly rates already account for school closing days.',
      registrationFees:
        'A one-time application fee, a one-time family fee, and a refundable security ' +
        'deposit are due at registration. Amounts are not published in the handbook — ' +
        'contact the school.',
    },
  },
});
