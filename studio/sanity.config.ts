/**
 * studio/sanity.config.ts
 * Sanity Studio, locked to a single purpose: editing tuition.
 *
 * The lockdown has three parts, all enforced here:
 *   1. One schema type (`tuition`) — see schemas/index.ts.
 *   2. One document, a singleton with the fixed id `tuition`, reachable only
 *      from the structure below.
 *   3. No create, delete, duplicate, or unpublish actions, and no "new document"
 *      menu — so the singleton cannot be removed or cloned.
 *
 * SETUP:
 * 1. Create a free Sanity project at https://sanity.io
 * 2. Put its project id in studio/.env as SANITY_STUDIO_PROJECT_ID=abc123de
 *    (or replace the fallback below)
 * 3. cd studio && npm install && npm run dev  →  http://localhost:3333
 * 4. Deploy with: npm run deploy
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes }   from './schemas';

/** The singleton's document id. Must match TUITION_QUERY in src/lib/pricing.ts. */
const TUITION_ID = 'tuition';

/** Actions an admin keeps. Everything else (create, delete, duplicate, unpublish) is removed. */
const ALLOWED_ACTIONS = ['publish', 'discardChanges', 'restore'];

export default defineConfig({
  name: 'wonder-montessori',
  title: 'Wonder Montessori — Tuition',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset:   process.env.SANITY_STUDIO_DATASET    || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Wonder Montessori')
          .items([
            S.listItem()
              .title('Tuition & Pricing')
              .id(TUITION_ID)
              .icon(() => '💵')
              .child(
                S.document()
                  .schemaType('tuition')
                  .documentId(TUITION_ID)
                  .title('Tuition & Pricing')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // No initial-value templates, so nothing can be created from a template either.
    templates: [],
  },

  document: {
    // Removes the global "create new document" affordances.
    newDocumentOptions: () => [],
    // Leaves only publish / discard / restore on the tuition document.
    actions: (prev) => prev.filter(a => ALLOWED_ACTIONS.includes(a.action ?? '')),
  },
});
