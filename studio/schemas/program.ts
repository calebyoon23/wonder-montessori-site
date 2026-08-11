/**
 * Sanity schema: Program
 * Controls the Programs page content and its tuition tables.
 *
 * There are three programs: Infant & Toddlers, Toddler & Two's, and 3–6 Primary.
 * Tuition figures must match the current academic year's Tuition Plans document.
 */
import { defineType, defineField, defineArrayMember } from 'sanity';

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
      description: 'e.g. Toddler & Two\'s',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'string',
      description:
        'Lowercase, no spaces. Used for links like /programs#toddler-twos. ' +
        'Must be one of: infant-toddlers, toddler-twos, primary.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'ageRange',
      title: 'Age Range',
      type: 'string',
      description: 'e.g. 15 months – 36 months',
      validation: r => r.required(),
    }),
    defineField({
      name: 'plans',
      title: 'Schedules & Monthly Tuition',
      type: 'array',
      description:
        'One row per schedule option. These must match the current Tuition Plans ' +
        'document exactly.',
      of: [defineArrayMember({
        type: 'object',
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
            validation: r => r.required(),
          }),
        ],
        preview: { select: { title: 'label', subtitle: 'price' } },
      })],
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
      description: 'Lower numbers appear first. Use 1, 2, 3 — youngest program first.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'ageRange', media: 'heroImage' },
  },
  orderings: [
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
