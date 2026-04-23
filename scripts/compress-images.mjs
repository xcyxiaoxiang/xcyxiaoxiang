import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const PUBLIC_DIR = join(ROOT, 'docs', 'public');
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

async function compressFile(filePath) {
  const before = await stat(filePath);
  const ext = extname(filePath).toLowerCase();
  const buffer = await readFile(filePath);
  let pipeline = sharp(buffer);

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
  }

  const output = await pipeline.toBuffer();
  await writeFile(filePath, output);
  const after = before.size - output.length;
  const percent = ((after / before.size) * 100).toFixed(1);

  if (after > 0) {
    console.log(`  ${filePath.replace(PUBLIC_DIR, '')}: ${(before.size / 1024).toFixed(1)}KB → ${(output.length / 1024).toFixed(1)}KB (-${percent}%)`);
  } else {
    console.log(`  ${filePath.replace(PUBLIC_DIR, '')}: already optimized`);
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...await walk(fullPath));
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }

  return images;
}

async function main() {
  console.log('Compressing images in docs/public/...\n');
  const images = await walk(PUBLIC_DIR);

  if (images.length === 0) {
    console.log('No images found.');
    return;
  }

  console.log(`Found ${images.length} image(s).\n`);

  for (const img of images) {
    try {
      await compressFile(img);
    } catch (err) {
      console.error(`  Failed to compress ${img}: ${err.message}`);
    }
  }

  console.log('\nDone.');
}

main();
