import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@staqforce-studio/staqui/styles.css";
import "./globals.css";
import { Shell } from "@/components/shell";
const geist = Geist({ variable: "--font-geist" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono" });
export const metadata: Metadata = {
  title: {
    default: "StaqUI — Less assembly. More possibility.",
    template: "%s — StaqUI",
  },
  description:
    "A React and TypeScript component library by Staqforce Studio. 50 composable components, semantic themes, accessible interactions, and compact layouts.",
  icons: { icon: "/brand/staqui-favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("staqui-theme");if(t==="light"||t==="dark")document.documentElement.dataset.staqTheme=t}catch(e){}`,
          }}
        />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
