export function GpayLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M21.6 12.2c0-.6-.05-1.2-.16-1.8H12v3.4h5.4a4.6 4.6 0 01-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.1z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .95-3.4.95-2.6 0-4.8-1.75-5.6-4.1H3.1v2.6A10 10 0 0012 22z" />
      <path fill="#FBBC04" d="M6.4 13.95a6 6 0 010-3.9V7.45H3.1a10 10 0 000 9.1l3.3-2.6z" />
      <path fill="#EA4335" d="M12 5.95c1.5 0 2.8.5 3.8 1.5l2.85-2.85A10 10 0 003.1 7.45l3.3 2.6C7.2 7.7 9.4 5.95 12 5.95z" />
    </svg>
  );
}

export function GpayLogo2() {
  return (
    <span style={{ display: 'inline-flex' }}>
      <GpayLogo />
    </span>
  );
}

export function QrArt() {
  const seed = [
    1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0,
    0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1,
  ];
  return (
    <>
      {seed.map((v, i) => (
        <div key={i} style={{ background: v ? '#141414' : 'transparent', borderRadius: 1 }} />
      ))}
    </>
  );
}
