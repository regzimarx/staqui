import type { Metadata } from "next";
import "@staqui/ui/styles.css";
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
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
