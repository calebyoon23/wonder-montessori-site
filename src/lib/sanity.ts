/**
 * src/lib/sanity.ts
 * Read-only Sanity client, used for exactly one thing: tuition (src/lib/pricing.ts).
 *
 * Set SANITY_PROJECT_ID and SANITY_DATASET in .env to turn it on. With no
 * credentials the site builds entirely from the checked-in content/ files, so a
 * missing or broken Sanity connection can never take a page down.
 */
import { createClient } from '@sanity/client';

const projectId  = import.meta.env.SANITY_PROJECT_ID  as string | undefined;
const dataset    = (import.meta.env.SANITY_DATASET as string | undefined) ?? 'production';
const apiVersion = '2024-01-01';

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

/** True when the site is reading live content from Sanity. */
export const sanityEnabled = Boolean(sanityClient);

/**
 * Safe GROQ fetch with typed fallback.
 * Returns fallback data when Sanity is not configured or a fetch fails.
 */
export async function fetchSanity<T>(query: string, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    const result = await sanityClient.fetch<T>(query);
    return result ?? fallback;
  } catch (err) {
    console.warn('[Sanity] Fetch failed — using fallback data:', (err as Error).message);
    return fallback;
  }
}
