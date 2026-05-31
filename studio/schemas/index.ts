/**
 * studio/schemas/index.ts
 * Exports all schema types for Sanity Studio.
 */
import { siteInfoSchema } from './siteInfo';
import { eventSchema }    from './event';
import { programSchema }  from './program';
import { staffSchema }    from './staff';

export const schemaTypes = [
  siteInfoSchema,
  programSchema,
  eventSchema,
  staffSchema,
];
