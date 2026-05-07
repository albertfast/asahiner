import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { PageLoader } from "@/components/portfolio/PageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmet Sahiner | Full-Stack Developer & Salesforce Certified",
  description:
    "Portfolio of Ahmet Sahiner — Results-Driven Computer Science Student, Full-Stack Developer, and Salesforce Certified Administrator & Developer. Based in San Francisco.",
  keywords: [
    "Ahmet Sahiner",
    "Full-Stack Developer",
    "Salesforce Developer",
    "Computer Science",
    "React",
    "Python",
    "Quantum Computing",
    "Portfolio",
  ],
  authors: [{ name: "Ahmet Sahiner" }],
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Ahmet Sahiner | Full-Stack Developer",
    description:
      "Results-Driven Computer Science Student | Full-Stack Developer | Salesforce Certified",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmet Sahiner | Full-Stack Developer",
    description:
      "Results-Driven Computer Science Student | Full-Stack Developer | Salesforce Certified",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PageLoader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
