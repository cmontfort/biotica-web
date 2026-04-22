import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Biotica — Train with data. Recover with purpose.',
  description:
    'Biotica connects your Oura Ring, Withings scale, and Android Health data to build AI-powered workout programs that adapt to how you actually feel.',
  metadataBase: new URL('https://biotica.app'),
  openGraph: {
    title: 'Biotica',
    description: 'Train with data. Recover with purpose.',
    url: 'https://biotica.app',
    siteName: 'Biotica',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biotica',
    description: 'Train with data. Recover with purpose.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-white antialiased">
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
