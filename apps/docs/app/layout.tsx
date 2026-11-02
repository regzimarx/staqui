import type { Metadata } from "next";
import "@staqforce/staqui/styles.css";
import "./globals.css";
import { Shell } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "StaqUI — A considered foundation for your next interface",
    template: "%s — StaqUI",
  },
  description:
    "A React and TypeScript component library by Staqforce Studio. 50 composable components, semantic themes, accessible interactions, and compact layouts.",
  icons: { icon: "/brand/staqui-favicon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("staqui-theme");if(t==="light"||t==="dark")document.documentElement.dataset.staqTheme=t;var d=localStorage.getItem("staqui-density");if(d==="compact"||d==="comfortable")document.documentElement.dataset.staqDensity=d}catch(e){}`,
          }}
        />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
