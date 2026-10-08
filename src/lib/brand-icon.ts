/**
 * The “MI” monogram used for the favicon (SVG + ICO) and the Apple touch icon.
 * Letters are drawn as paths, so they render identically everywhere — no font needed.
 */
export function brandIconSvg({ rounded = true }: { rounded?: boolean } = {}) {
  const radius = rounded ? 14 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6b9bff"/>
      <stop offset="0.5" stop-color="#3dd6eb"/>
      <stop offset="1" stop-color="#a99bff"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="${radius}" fill="#0b0f17"/>
  ${rounded ? `<rect x="1.5" y="1.5" width="61" height="61" rx="${radius - 1.5}" fill="none" stroke="url(#ring)" stroke-opacity="0.7" stroke-width="2"/>` : ""}
  <path d="M12 47V17h7.4L26 32.2 32.6 17H40v30h-6.4V29.2L28.5 41h-5L18.4 29.2V47z" fill="#f2f5fa"/>
  <rect x="44.2" y="17" width="6.6" height="30" rx="1" fill="#f2f5fa"/>
</svg>`;
}

export function brandIconDataUri(options?: { rounded?: boolean }) {
  return `data:image/svg+xml;base64,${Buffer.from(brandIconSvg(options)).toString("base64")}`;
}
