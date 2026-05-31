/**
 * Sanity schema: Staff
 * Teacher bios and photos shown on the About page.
 */
import { defineType, defineField } from 'sanity';

export const staffSchema = defineType({
  name: 'staff',
  title: 'Staff & Team',
  type: 'document',
  icon: () => '👩‍🏫',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'e.g. Lead Teacher, Montessori Director, Toddler Guide',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      description: 'A short paragraph about this person.',
    }),
    defineField({
      name: 'photo',
      title: 'Headshot Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
  },
});
