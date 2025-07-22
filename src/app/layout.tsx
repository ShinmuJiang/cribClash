import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { UploadFormProvider } from '@/context/UploadFormContext';
import { AuthProvider } from '@/context/AuthContext';

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "RateMyDorm",
  description: "Find and share dorm reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <AuthProvider>
          <UploadFormProvider>
            {children}
          </UploadFormProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
