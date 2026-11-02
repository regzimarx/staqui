"use client";
import { useState, useEffect, useLayoutEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  StaqProvider,
  Button,
  ButtonGroup,
  Icon,
  SearchField,
  Badge,
  Modal,
  Text,
  type Density,
} from "@staqforce/staqui";
import { catalog, categories, searchCatalog } from "@/lib/catalog";
import { SiteLink as Link } from "@/components/site-link";
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="StaqUI home">
      <span className="brand-mark" aria-hidden="true" />
      <span>
        Staq<span className="brand-light">UI</span>
      </span>
    </Link>
  );
}
export function Shell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<Density>("compact");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  useBrowserLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.staqTheme === "dark") setTheme("dark");
    if (root.dataset.staqDensity === "comfortable") setDensity("comfortable");
  }, []);
  useEffect(() => {
    document.documentElement.dataset.staqTheme = theme;
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.staqDensity = density;
  }, [density]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [path]);
  function changeTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("staqui-theme", next);
    } catch {}
  }
  function changeDensity(next: Density) {
    setDensity(next);
    try {
      localStorage.setItem("staqui-density", next);
    } catch {}
  }
  const filtered = searchCatalog(query);
  const sidebar = (
    <>
      <div className="sidebar-intro">
        <div className="mobile-primary-links">
          <Link href="/components">All components</Link>
          <Link href="/examples">Application examples</Link>
        </div>
        <Link
          href="/docs/getting-started"
          className={path === "/docs/getting-started" ? "active" : ""}
        >
          Getting started
        </Link>
        <Link
          href="/docs/theming"
          className={path === "/docs/theming" ? "active" : ""}
        >
          Themes & tokens
        </Link>
        <Link
          href="/docs/accessibility"
          className={path === "/docs/accessibility" ? "active" : ""}
        >
          Accessibility
        </Link>
        <Link
          href="/docs/design"
          className={path === "/docs/design" ? "active" : ""}
        >
          Design decisions
        </Link>
      </div>
      <div className="sidebar-label">
        Components <span>{catalog.length}</span>
      </div>
      {categories.map((category) => (
        <div className="sidebar-group" key={category}>
          <h3>{category}</h3>
          {catalog
            .filter((c) => c.category === category)
            .map((c) => (
              <Link
                href={`/components/${c.slug}`}
                key={c.slug}
                className={path === `/components/${c.slug}` ? "active" : ""}
                aria-current={
                  path === `/components/${c.slug}` ? "page" : undefined
                }
              >
                {c.title}
              </Link>
            ))}
        </div>
      ))}
      <div className="sidebar-end">
        <Icon name="code" size={16} />
        <span>React + TypeScript</span>
      </div>
    </>
  );
  return (
    <StaqProvider
      theme={theme}
      density={density}
      className={path === "/" ? "site site-landing" : "site"}
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="top-nav" aria-label="Main navigation">
            <Link
              href="/components"
              aria-current={path.startsWith("/components") ? "page" : undefined}
            >
              Components
            </Link>
            <Link
              href="/docs/getting-started"
              aria-current={path.startsWith("/docs") ? "page" : undefined}
            >
              Documentation
            </Link>
            <Link
              href="/examples"
              aria-current={path === "/examples" ? "page" : undefined}
            >
              Examples
            </Link>
          </nav>
          <div className="header-tools">
            <Button
              className="search-trigger"
              variant="tertiary"
              onClick={() => setSearchOpen(true)}
              aria-label="Search docs ⌘ K"
            >
              <Icon name="search" size={16} />
              <span>Search docs</span>
              <kbd aria-hidden="true">⌘ K</kbd>
            </Button>
            <Button
              variant="tertiary"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              onClick={changeTheme}
            >
              <Icon name={theme === "light" ? "moon" : "sun"} />
            </Button>
            <Button
              className="mobile-menu-button"
              variant="tertiary"
              aria-expanded={menuOpen}
              aria-controls="site-sidebar"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <Icon name="layers" />
            </Button>
          </div>
        </div>
      </header>
      <div className="site-layout">
        <aside
          className={`site-sidebar ${menuOpen ? "is-open" : ""}`}
          id="site-sidebar"
          aria-label="Documentation navigation"
        >
          {sidebar}
        </aside>
        <div className="site-main">
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <span>StaqUI. A product of Staqforce Studio.</span>
            <Link href="/docs/coverage">Coverage & adaptations</Link>
            <span>MIT licensed</span>
          </footer>
        </div>
      </div>
      <div className="density-dock">
        <ButtonGroup label="Component density" className="density-switch">
          <Button
            variant="tertiary"
            size="small"
            aria-pressed={density === "compact"}
            aria-label="Compact density"
            title="Compact density"
            onClick={() => changeDensity("compact")}
          >
            <Icon name="layers" size={14} />
            <span className="density-switch-label">Compact</span>
          </Button>
          <Button
            variant="tertiary"
            size="small"
            aria-pressed={density === "comfortable"}
            aria-label="Comfortable density"
            title="Comfortable density"
            onClick={() => changeDensity("comfortable")}
          >
            <Icon name="sliders" size={14} />
            <span className="density-switch-label">Comfortable</span>
          </Button>
        </ButtonGroup>
      </div>
      <Modal
        title="Search documentation"
        description="Find a component by name, category, or purpose."
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <SearchField
          label="Search components"
          hideLabel
          autoFocus
          placeholder="Search 50 components…"
          value={query}
          onValueChange={setQuery}
        />
        <div className="search-results">
          {filtered.slice(0, 12).map((c) => (
            <Link
              key={c.slug}
              href={`/components/${c.slug}`}
              className="search-result"
              onClick={() => setSearchOpen(false)}
            >
              <span>{c.title}</span>
              <Text tone="muted" size="small">
                {c.category}
              </Text>
            </Link>
          ))}
          {!filtered.length && (
            <Text tone="muted">
              No results. Try “date”, “input”, or “layout”.
            </Text>
          )}
        </div>
      </Modal>
    </StaqProvider>
  );
}
