import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neurodog",
  description: "Emotional robotic service dogs assisting those in need",
  metadataBase: new URL("https://neurodog.vercel.app/"),
  openGraph: { images: "/opengraph-image.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Neurodog</title>
        <meta name="title" content="Neurodog" />
        <meta
          name="description"
          content="Emotional robotic service dogs assisting those in need."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://https://neurodog.vercel.app" />
        <meta property="og:title" content="Neurodog" />
        <meta
          property="og:description"
          content="Emotional robotic service dogs assisting those in need."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/x89Fgvm/Neurodog-OG-Image-1.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://https://neurodog.vercel.app"
        />
        <meta property="twitter:title" content="Neurodog" />
        <meta
          property="twitter:description"
          content="Emotional robotic service dogs assisting those in need."
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/x89Fgvm/Neurodog-OG-Image-1.jpg"
        />
      </Head>
      <body className={inter.className}>
        <Toaster richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientWrapper>{children}</QueryClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
