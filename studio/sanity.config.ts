/**
 * studio/sanity.config.ts
 * Sanity Studio configuration.
 *
 * SETUP STEPS:
 * 1. Create a free Sanity project at https://sanity.io
 * 2. Replace YOUR_PROJECT_ID below with your real project ID
 * 3. cd studio && npm install && npm run dev
 * 4. Visit http://localhost:3333 to access the Studio
 * 5. Deploy with: npx sanity deploy
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool }    from '@sanity/vision';
import { schemaTypes }   from './schemas';

export default defineConfig({
  name: 'wonder-montessori',
  title: 'Wonder Montessori Studio',

  projectId: 'YOUR_PROJECT_ID',   // ← Replace with your Sanity project ID
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('School Information')
              .id('siteInfo')
              .child(
                S.document()
                  .schemaType('siteInfo')
                  .documentId('siteInfo')
              ),
            S.divider(),
            S.documentTypeListItem('program').title('Programs & Pricing'),
            S.documentTypeListItem('staff').title('Staff & Team'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
