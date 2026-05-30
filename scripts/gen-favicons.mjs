// Generate rounded favicons cropped on the face from src/assets/profile.png
// Usage: node scripts/gen-favicons.mjs
import sharp from 'sharp';

const SRC = 'src/assets/profile.png';

const targets = [
  { name: 'favicon-32.png', size: 64 },           // 2x retina for 32px tabs
  { name: 'favicon-192.png', size: 192 },         // Android / PWA
  { name: 'apple-touch-icon.png', size: 180 },    // iOS
];

const meta = await sharp(SRC).metadata();
if (!meta.width || !meta.height) throw new Error('Could not read source size');

// Zoom factor : smaller = tighter framing on the face.
// 1.0 = full image width, 0.5 = crop half the width (×2 zoom).
const ZOOM = 0.75;

// Face vertical center on this photo : ratio from top of source image.
// Higher value = crop pulls further down = face appears higher in the favicon.
const FACE_Y_RATIO = 0.42;

const cropSize = Math.round(meta.width * ZOOM);
const offsetLeft = Math.round((meta.width - cropSize) / 2); // center horizontally
let offsetTop = Math.round(meta.height * FACE_Y_RATIO - cropSize / 2);
offsetTop = Math.max(0, Math.min(offsetTop, meta.height - cropSize));
const safeHeight = Math.min(cropSize, meta.height - offsetTop);

for (const { name, size } of targets) {
  const radius = Math.round(size * 0.22); // ~22% rounded corners (iOS-ish)
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/>
     </svg>`
  );

  await sharp(SRC)
    .extract({ left: offsetLeft, top: offsetTop, width: cropSize, height: safeHeight })
    .resize(size, size, { fit: 'cover', position: 'center' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png({ compressionLevel: 9 })
    .toFile(`public/${name}`);

  console.log(`✓ public/${name}  (${size}×${size}, r=${radius})`);
}
