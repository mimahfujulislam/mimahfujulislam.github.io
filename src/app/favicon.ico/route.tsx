import { ImageResponse } from "next/og";
import { brandIconDataUri } from "@/lib/brand-icon";

// Exported as /favicon.ico at build time: an ICO file holding 32px and 48px PNGs,
// for browsers and crawlers that don't use the SVG favicon.
export const dynamic = "force-static";

const SIZES = [32, 48];

async function renderPng(size: number) {
  const image = new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element -- rendered to PNG by Satori, not the DOM
    <img src={brandIconDataUri()} width={size} height={size} alt="" />,
    { width: size, height: size },
  );
  return new Uint8Array(await image.arrayBuffer());
}

export async function GET() {
  const pngs = await Promise.all(SIZES.map(renderPng));
  const headerSize = 6 + 16 * pngs.length;
  const ico = new Uint8Array(headerSize + pngs.reduce((total, png) => total + png.length, 0));
  const view = new DataView(ico.buffer);

  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, pngs.length, true);

  let offset = headerSize;
  pngs.forEach((png, i) => {
    const entry = 6 + 16 * i;
    ico[entry] = SIZES[i]; // width
    ico[entry + 1] = SIZES[i]; // height
    view.setUint16(entry + 4, 1, true); // colour planes
    view.setUint16(entry + 6, 32, true); // bits per pixel
    view.setUint32(entry + 8, png.length, true);
    view.setUint32(entry + 12, offset, true);
    ico.set(png, offset);
    offset += png.length;
  });

  return new Response(ico, { headers: { "Content-Type": "image/x-icon" } });
}
