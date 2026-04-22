import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Biotica — Train with data. Recover with purpose.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), 'public/logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

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
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            background:
              'radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo + wordmark row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Biotica"
            width={160}
            height={160}
            style={{ borderRadius: 32 }}
          />
          <span
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#FAFAFA',
              letterSpacing: '-3px',
            }}
          >
            Biotica
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 32,
            color: '#A1A1AA',
            margin: 0,
            letterSpacing: '0.3px',
          }}
        >
          Train with data. Recover with purpose.
        </p>
      </div>
    ),
    { ...size }
  );
}
