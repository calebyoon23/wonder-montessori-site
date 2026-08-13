/**
 * studio/schemas/index.ts
 * The Studio has exactly one schema on purpose.
 *
 * Tuition is the only thing an admin can change. School details, staff, program
 * names, photos, and page copy are code, edited through a pull request — see
 * src/lib/site.ts, src/lib/content.ts, and content/site-info.json.
 *
 * Calendar events are not here either: the Calendar page embeds the school's
 * Google Calendar, so events are managed in Google Calendar.
 */
import { tuitionSchema } from './tuition';

export const schemaTypes = [tuitionSchema];
