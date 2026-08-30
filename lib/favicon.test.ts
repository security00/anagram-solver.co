import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

type IconFrame = {
  width: number;
  height: number;
  bytes: Buffer;
};

function readIconFrames(): IconFrame[] {
  const icon = readFileSync(resolve(process.cwd(), 'app/favicon.ico'));

  expect(icon.readUInt16LE(0)).toBe(0);
  expect(icon.readUInt16LE(2)).toBe(1);

  const count = icon.readUInt16LE(4);

  return Array.from({ length: count }, (_, index) => {
    const entryOffset = 6 + index * 16;
    const width = icon[entryOffset] || 256;
    const height = icon[entryOffset + 1] || 256;
    const byteLength = icon.readUInt32LE(entryOffset + 8);
    const imageOffset = icon.readUInt32LE(entryOffset + 12);

    return {
      width,
      height,
      bytes: icon.subarray(imageOffset, imageOffset + byteLength),
    };
  });
}

describe('favicon', () => {
  it('contains browser-friendly tab icon sizes', () => {
    const frames = readIconFrames();
    const sizes = frames.map(({ width, height }) => `${width}x${height}`);

    expect(sizes).toEqual(expect.arrayContaining(['16x16', '32x32', '48x48']));
    expect(frames.length).toBeGreaterThanOrEqual(4);
  });

  it('uses RGBA when a frame is encoded as PNG', () => {
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const pngFrames = readIconFrames().filter(({ bytes }) => bytes.subarray(0, 8).equals(pngSignature));

    for (const { bytes } of pngFrames) {
      // PNG IHDR colour type 6 is truecolour with an alpha channel.
      expect(bytes[25]).toBe(6);
    }
  });
});
