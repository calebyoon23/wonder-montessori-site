/**
 * src/lib/images.ts
 * Central registry of every photograph used on the site.
 *
 * Every slot below is a genuine Wonder Montessori photograph. `ready` gates
 * rendering: a slot set to false makes its section fall back to a designed,
 * photo-free treatment rather than shipping a placeholder. Add a new slot as
 * `ready: false` until the real photo is in place, with `alt` describing what
 * the photo actually shows.
 *
 * Optimized JPEGs live in public/images/; the full-size originals are kept out
 * of the build in source-photos/.
 */

export interface Photo {
  src: string;
  alt: string;
  /** False until a genuine Wonder Montessori photograph is in place. */
  ready: boolean;
}

export const PHOTOS = {
  /** Homepage hero, right-hand framed image. */
  homeHero: {
    src: '/images/school-building.jpg',
    alt: 'The Wonder Montessori School building, a brick single-storey school with a painted mural along one wall',
    ready: true,
  },

} satisfies Record<string, Photo>;

/** Per-program photography, keyed by the program slug in site.ts. */
export const PROGRAM_PHOTOS: Record<string, Photo> = {
  'infant-toddlers': {
    src: '/images/infant.jpg',
    alt: 'The infant and toddler room, with a soft-play climbing structure and slide on an open wood floor',
    ready: true,
  },
  'toddler-twos': {
    src: '/images/toddler.jpg',
    alt: 'The toddler classroom, with child-height tables and chairs and open wooden shelves of materials',
    ready: true,
  },
  primary: {
    src: '/images/playground.jpg',
    alt: "The school's fenced outdoor playground, with a climbing structure, slide, and shaded soft-surface play area",
    ready: true,
  },
};

/** Returns the photo for a slot, or null when no genuine photo is in place yet. */
export function photo(slot: Photo): Photo | null {
  return slot.ready ? slot : null;
}
