/**
 * studio/sanity.cli.ts
 * Config for the `sanity` command line tool (dev, build, deploy).
 *
 * Separate from sanity.config.ts, which configures the Studio itself. The CLI
 * reads the project id from here — without this file `sanity deploy` cannot
 * tell which project to publish to and fails with a missing "api.projectId".
 *
 * The id comes from studio/.env (SANITY_STUDIO_PROJECT_ID), which is gitignored,
 * so this file stays free of project-specific values.
 */
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset:   process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
