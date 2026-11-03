"use client";
import { useEffect, useState } from "react";
import NextLink from "next/link";
const anchor = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export function GuideOutline({ sections }: { sections: string[] }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const headings = sections
      .map((title) => document.getElementById(anchor(title)))
      .filter((element): element is HTMLElement => element !== null);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const passed = headings.filter(
          (heading) => heading.getBoundingClientRect().top <= 150,
        );
        const atEnd =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4;
        setActive(
          (atEnd
            ? headings[headings.length - 1]
            : (passed[passed.length - 1] ?? headings[0])
          )?.id ?? "",
        );
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [sections]);
  return (
    <aside className="guide-outline">
      <nav aria-label="In this guide">
        <span className="studio-kicker">IN THIS GUIDE</span>
        {sections.length ? (
          sections.map((title) => (
            <a
              key={title}
              href={`#${anchor(title)}`}
              aria-current={active === anchor(title) ? "location" : undefined}
            >
              {title}
            </a>
          ))
        ) : (
          <a href="#main-content">Component inventory</a>
        )}
      </nav>
      <div>
        <strong>Build your Staq.</strong>
        <p>51 components. One connected system.</p>
        <NextLink href="/components">Explore the library ↗</NextLink>
      </div>
    </aside>
  );
}
