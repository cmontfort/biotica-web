import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Biotica — Train with data. Recover with purpose.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle radial glow behind logo */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            background:
              'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo lockup */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 36,
          }}
        >
          {/* B lettermark in a rounded square */}
          <div
            style={{
              width: 80,
              height: 80,
              background: '#4ADE80',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: '#09090B',
                lineHeight: 1,
              }}
            >
              B
            </span>
          </div>

          {/* Wordmark */}
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#FAFAFA',
              letterSpacing: '-2px',
            }}
          >
            Biotica
          </span>
        </div>

        {/* Pulse / heartbeat line */}
        <svg
          width="320"
          height="48"
          viewBox="0 0 320 48"
          style={{ marginBottom: 36 }}
        >
          <polyline
            points="0,24 60,24 80,4 100,44 120,14 140,34 160,24 320,24"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Tagline */}
        <p
          style={{
            fontSize: 30,
            color: '#A1A1AA',
            margin: 0,
            letterSpacing: '0.5px',
          }}
        >
          Train with data. Recover with purpose.
        </p>
      </div>
    ),
    { ...size }
  );
}
