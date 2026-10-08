import { renderSocialImage } from "@/lib/og-image";

// Exported as /og.png at build time (a real .png, so static hosts send the right content type).
export const dynamic = "force-static";

export function GET() {
  return renderSocialImage();
}
