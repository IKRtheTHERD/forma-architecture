import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CrosshairCursor from '@/components/CrosshairCursor';

export const metadata: Metadata = {
  title: 'FORMA ARCHITECTURE // Advanced Online Studio School',
  description: 'Immersive online architecture school offering advanced studio courses, computational design labs, and Pritzker laureate critiques for practicing architects.',
  keywords: ['Architecture School', 'Parametric Urbanism', 'Mass Timber', 'Computational Design', 'Architectural Studio', 'Pritzker Laureates'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-drafting-grid text-[#1A1A1A] antialiased min-h-screen flex flex-col justify-between cursor-crosshair-oxide selection:bg-[#C1440E] selection:text-white">
        <CrosshairCursor />
        <Navbar />
        <main className="flex-1 w-full"><SmoothScrollProvider>{children}</SmoothScrollProvider></main>
        <Footer />
      </body>
    </html>
  );
}
\nimport SmoothScrollProvider from '@/components/SmoothScrollProvider';