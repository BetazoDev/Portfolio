import { ImageResponse } from 'next/og';

export const alt = 'Humberto Alonso — Full-stack developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generated instead of shipped as a binary so the card always matches the site's identity
// and no oversized photo has to live in the repo.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050505',
          color: '#f0f0f0',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 22, letterSpacing: 10, textTransform: 'uppercase', color: '#a855f7' }}>
            Humberto Guadalupe
          </span>
          <span style={{ fontSize: 26, letterSpacing: 8, textTransform: 'uppercase', fontWeight: 700 }}>
            Alonso López
          </span>
        </div>

        <div
          style={{
            fontSize: 92,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: -3,
            textTransform: 'uppercase',
            maxWidth: 940,
            display: 'flex',
          }}
        >
          Platforms, CMS, automation and AI
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 24, letterSpacing: 6, textTransform: 'uppercase', color: '#a855f7' }}>
            halonso.digital
          </span>
          <span style={{ fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.6 }}>
            Full-stack developer
          </span>
        </div>
      </div>
    ),
    size,
  );
}
