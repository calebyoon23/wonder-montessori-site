/**
 * src/lib/sanity.ts
 * Sanity client setup. Set SANITY_PROJECT_ID and SANITY_DATASET in your .env file.
 * If not configured, all fetches gracefully return fallback data.
 */
import { createClient } from '@sanity/client';

const projectId  = import.meta.env.SANITY_PROJECT_ID  as string | undefined;
const dataset    = (import.meta.env.SANITY_DATASET as string | undefined) ?? 'production';
const apiVersion = '2024-01-01';

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

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

/** Build a Sanity image CDN URL from a Sanity image reference object */
export function sanityImageUrl(source: { asset?: { _ref?: string } } | null | undefined): string | null {
  if (!projectId || !source?.asset?._ref) return null;
  // _ref format: image-{id}-{dimensions}-{ext}
  const ref = source.asset._ref.replace('image-', '').replace(/-([^-]+)$/, '.$1').replace(/-(\d+x\d+)-/, '-$1-');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref.replace('image-', '')}`;
}
