import { brandIconSvg } from "@/lib/brand-icon";

// Exported as /favicon.svg at build time.
export const dynamic = "force-static";

export function GET() {
  return new Response(brandIconSvg(), { headers: { "Content-Type": "image/svg+xml" } });
}
