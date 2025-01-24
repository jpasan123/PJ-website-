import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickActions from '@/components/layout/QuickActions';
import NewsletterPopup from '@/components/features/NewsletterPopup';
import { BackgroundEffect } from '@/components/animations/BackgroundEffect';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AnimationProvider } from '@/components/providers/AnimationProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Commercial SMB',
  description: 'Business Equipment & Solutions for Modern Enterprises',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnimationProvider>
            <div className="flex min-h-screen flex-col relative">
              <BackgroundEffect />
              <Header />
              <main className="flex-1 relative">
                {children}
              </main>
              <Footer />
              <QuickActions />
            </div>
            <NewsletterPopup />
            <Toaster />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}