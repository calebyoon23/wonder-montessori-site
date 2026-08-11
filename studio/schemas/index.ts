/**
 * studio/schemas/index.ts
 * Exports all schema types for Sanity Studio.
 *
 * Note: there is no Event schema. The Calendar page embeds the school's Google
 * Calendar directly, so events are managed in Google Calendar, not here.
 */
import { siteInfoSchema } from './siteInfo';
import { programSchema }  from './program';
import { staffSchema }    from './staff';

export const schemaTypes = [
  siteInfoSchema,
  programSchema,
  staffSchema,
];
