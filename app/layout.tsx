import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

// Export metadata from the server component
export const metadata: Metadata = {
  title: "Your Vision for Your Farm – Peace, Love & Harmony",
  description:
    "You love your farm, but the future feels uncertain? Peace, Love & Harmony shows you new possibilities – rooted in your vision, carried by a community.",
};

// Dynamically import the client-only providers component without extracting a non-existent property.
const ClientProviders = dynamic(() => import("@/components/ClientProviders"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ClientProviders>
            {children}
            <Toaster position="top-right" closeButton />
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
