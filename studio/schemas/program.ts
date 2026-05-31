/**
 * Sanity schema: Program
 * Controls the Programs page content and pricing.
 */
import { defineType, defineField } from 'sanity';

export const programSchema = defineType({
  name: 'program',
  title: 'Programs',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'name',
      title: 'Program Name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'ageRange',
      title: 'Age Range',
      type: 'string',
      description: 'e.g. 6 weeks – 18 months',
      validation: r => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Monthly Tuition',
      type: 'string',
      description: 'e.g. $2,400 / month. Write exactly how you want it displayed.',
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'string',
      description: 'e.g. Full-day · 7:00 AM – 6:00 PM',
    }),
    defineField({
      name: 'notes',
      title: 'Notes / Description',
      type: 'text',
      rows: 3,
      description: 'Shown on the Programs page as the description text.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Program Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 1, 2, 3, 4.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'ageRange', media: 'heroImage' },
  },
  orderings: [
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
