import { AuthProvider } from '@/lib/auth/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Rational Mind',
  description: 'Your personal AI-powered RATIONAL companion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-gradient text-primary font-sans min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}