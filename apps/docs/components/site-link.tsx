"use client";

import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cx } from "@staqui/ui";

interface SiteLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  tone?: "neutral" | "critical";
  variant?: "text" | "button";
}

export function SiteLink({
  tone = "neutral",
  variant = "text",
  className,
  target,
  rel,
  ...props
}: SiteLinkProps) {
  return (
    <NextLink
      className={cx(variant === "button" ? "sq-button" : "sq-link", className)}
      data-tone={tone}
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      {...props}
    />
  );
}
