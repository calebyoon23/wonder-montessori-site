/**
 * Sanity schema: Site Info
 * Controls school name, contact details, tagline, and the Google Calendar ID
 * across the entire site.
 */
import { defineType, defineField } from 'sanity';

export const siteInfoSchema = defineType({
  name: 'siteInfo',
  title: 'School Information',
  type: 'document',
  icon: () => '🏫',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'contact',  title: 'Contact' },
    { name: 'systems',  title: 'Calendar & Forms' },
  ],
  fields: [
    defineField({
      name: 'schoolName', title: 'School Name (short)', type: 'string', group: 'identity',
      description: 'Shown in the navigation bar. Keep it short.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'legalName', title: 'Full Legal Name', type: 'string', group: 'identity',
      description: 'Used in the footer copyright line. e.g. Wonder Montessori School',
    }),
    defineField({
      name: 'tagline', title: 'Tagline', type: 'string', group: 'identity',
      description: 'Short phrase shown in the hero and footer.',
    }),
    defineField({
      name: 'established', title: 'Year Founded', type: 'string', group: 'identity',
      initialValue: '1993',
    }),

    defineField({
      name: 'address', title: 'Street Address', type: 'string', group: 'contact',
      description: 'Street line only. e.g. 5622–5644 North Pulaski Road',
    }),
    defineField({
      name: 'cityState', title: 'City, State & ZIP', type: 'string', group: 'contact',
      description: 'e.g. Chicago, IL 60646',
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'fax',   title: 'Fax',   type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({
      name: 'hours', title: 'Hours of Operation', type: 'string', group: 'contact',
      description: 'e.g. Monday – Friday, 7:00 AM – 6:00 PM',
    }),

    defineField({
      name: 'calendarId', title: 'Google Calendar ID', type: 'string', group: 'systems',
      description:
        'The calendar shown on the Calendar page. Find it in Google Calendar under ' +
        'Settings → your calendar → Integrate calendar → Calendar ID. The calendar must ' +
        'be set to "Make available to public" or visitors will see an error.',
    }),
    defineField({
      name: 'timezone', title: 'Calendar Timezone', type: 'string', group: 'systems',
      initialValue: 'America/Chicago',
      description: 'IANA timezone name. Leave as America/Chicago.',
    }),
    defineField({
      name: 'formspreeId', title: 'Formspree Form ID', type: 'string', group: 'systems',
      description: 'From formspree.io, after creating a form. Powers the tour request form.',
    }),
  ],
  preview: { select: { title: 'schoolName' } },
});
