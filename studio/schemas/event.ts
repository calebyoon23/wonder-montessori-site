/**
 * Sanity schema: Event
 * Used for the calendar page. Owner adds/removes events through Sanity Studio.
 */
import { defineType, defineField } from 'sanity';

export const eventSchema = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g. 10:00 AM – 12:00 PM',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'highlight',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Featured events appear at the top of the calendar page.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
  orderings: [
    { title: 'Date (ascending)', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] },
  ],
});
