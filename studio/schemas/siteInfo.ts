/**
 * Sanity schema: Site Info
 * Controls school name, contact details, and tagline across the entire site.
 */
import { defineType, defineField } from 'sanity';

export const siteInfoSchema = defineType({
  name: 'siteInfo',
  title: 'School Information',
  type: 'document',
  icon: () => '🏫',
  fields: [
    defineField({ name: 'schoolName', title: 'School Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'tagline',    title: 'Tagline',     type: 'string', description: 'Short phrase shown in the hero and footer.' }),
    defineField({ name: 'address',    title: 'Address',     type: 'string' }),
    defineField({ name: 'phone',      title: 'Phone',       type: 'string' }),
    defineField({ name: 'email',      title: 'Email',       type: 'string' }),
    defineField({ name: 'hours',      title: 'Office Hours',type: 'string', description: 'e.g. Monday – Friday, 7:00 AM – 6:00 PM' }),
    defineField({ name: 'established',title: 'Year Founded',type: 'string', initialValue: '1993' }),
    defineField({ name: 'formspreeId',title: 'Formspree Form ID', type: 'string', description: 'Get this from formspree.io after creating a form.' }),
    defineField({ name: 'heroImage',  title: 'Hero Image',  type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutImage', title: 'About Page Image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'schoolName' } },
});
