import type { Metadata } from "next";
import { Outfit} from "next/font/google";
import "./globals.css";
import Providers from "./provider";

const outfit=Outfit({subsets:['latin']})
export const metadata: Metadata = {
  title: "POS - Next.js",
  description: "POS - Next,js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-200`}>
        {/* add all routes to provider queryClient */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
