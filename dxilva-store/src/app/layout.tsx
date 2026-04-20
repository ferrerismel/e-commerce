import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "D'XILVA Store | Modern E-commerce",
  description: 'Descubre productos exclusivos en D\'XILVA Store. Tecnología, moda y más con la mejor calidad.',
  keywords: ['e-commerce', 'tienda online', 'shopping', 'tecnología', 'moda'],
  authors: [{ name: "D'XILVA" }],
  creator: "D'XILVA",
  publisher: "D'XILVA Store",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://dxilvastore.com',
    siteName: "D'XILVA Store",
    title: "D'XILVA Store | Modern E-commerce",
    description: 'Descubre productos exclusivos en D\'XILVA Store.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "D'XILVA Store",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "D'XILVA Store",
    description: 'Descubre productos exclusivos en D\'XILVA Store.',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-dxilva-white dark:bg-dxilva-black text-dxilva-black dark:text-dxilva-white">
        {children}
      </body>
    </html>
  );
}
