// Twitter card uses the same image as the Open Graph card. Re-exporting the
// `runtime`/`alt`/`size`/`contentType` config from another file confuses
// Turbopack's static analyzer, so we declare them inline here and only
// re-export the default render function.
export { default } from './opengraph-image';

export const runtime = 'nodejs';
export const alt = 'Biotica — Train with data. Recover with purpose.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
