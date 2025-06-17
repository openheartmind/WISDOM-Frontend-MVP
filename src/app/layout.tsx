import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RenderMounted } from "@/components/ClientRender";
import { NavBar } from "@/components/ui/navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_TITLE,
  description:
    "Free, open-source MVP app for valuing diverse contributions through participatory reviews—enabling fair recognition, reward, and coordination across communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RenderMounted>
          <AuthProvider>
            <NavBar />
            {children}
            <Toaster />
          </AuthProvider>
        </RenderMounted>
      </body>
    </html>
  );
}
