"use client";
import { useState, useEffect, useLayoutEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  StaqProvider,
  Button,
  ButtonGroup,
  Icon,
  SearchField,
  Modal,
  Text,
  type Density,
} from "@staqforce-studio/staqui";
import { guides } from "@/lib/guides";
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
  const matchingGuides = guides.filter(([slug, , title, description]) =>
    `${slug} ${title} ${description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const sidebar = (
    <>
      <div className="sidebar-intro">
        <span className="sidebar-section-title">THE FIELD GUIDE</span>
        <Link
          href="/docs"
          className={path === "/docs" ? "active" : ""}
          aria-current={path === "/docs" ? "page" : undefined}
        >
          Overview
        </Link>
        <div className="mobile-primary-links">
          <Link href="/components">All components</Link>
          <Link href="/examples">Application examples</Link>
        </div>
        <Link
          href="/docs/getting-started"
          className={path === "/docs/getting-started" ? "active" : ""}
          aria-current={path === "/docs/getting-started" ? "page" : undefined}
        >
          Getting started
        </Link>
        <Link
          href="/docs/theming"
          className={path === "/docs/theming" ? "active" : ""}
          aria-current={path === "/docs/theming" ? "page" : undefined}
        >
          Themes & tokens
        </Link>
        <Link
          href="/docs/accessibility"
          className={path === "/docs/accessibility" ? "active" : ""}
          aria-current={path === "/docs/accessibility" ? "page" : undefined}
        >
          Accessibility
        </Link>
        <Link
          href="/docs/design"
          className={path === "/docs/design" ? "active" : ""}
          aria-current={path === "/docs/design" ? "page" : undefined}
        >
          Design language
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
      <div className="sidebar-extra">
        <Link href="/docs/coverage">Component inventory</Link>
        <Link href="/docs/deployment">Deploy the docs</Link>
      </div>
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
              href="/docs"
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
              size="small"
              onClick={() => setSearchOpen(true)}
              aria-label="Search docs ⌘ K"
            >
              <Icon name="search" size={16} />
              <span>Search docs</span>
              <kbd aria-hidden="true">⌘ K</kbd>
            </Button>
            <Button
              variant="tertiary"
              size="small"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
              onClick={changeTheme}
            >
              <Icon name={theme === "light" ? "moon" : "sun"} />
            </Button>
            <Modal
              title="Explore StaqUI"
              description="Guides, components, and working examples."
              open={menuOpen}
              onOpenChange={setMenuOpen}
              trigger={
                <Button
                  className="mobile-menu-button"
                  size="small"
                  variant="tertiary"
                  aria-label="Toggle navigation"
                >
                  <Icon name="layers" />
                </Button>
              }
            >
              <nav
                className="mobile-docs-nav"
                aria-label="Mobile documentation navigation"
                onClick={(event) => {
                  if ((event.target as HTMLElement).closest("a"))
                    setMenuOpen(false);
                }}
              >
                {sidebar}
              </nav>
            </Modal>
          </div>
        </div>
      </header>
      <div className="site-layout">
        <aside
          className="site-sidebar"
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
            <div className="footer-brand">
              <Logo />
              <span>Thoughtful pieces. Powerful products.</span>
            </div>
            <div className="footer-links">
              <Link href="/docs">Documentation</Link>
              <Link href="/components">Components</Link>
              <Link href="/examples">Examples</Link>
              <Link
                href="https://www.npmjs.com/package/@staqforce-studio/staqui"
                target="_blank"
                rel="noopener noreferrer"
              >
                npm <Icon name="arrowUpRight" size={12} />
              </Link>
            </div>
            <span className="footer-credit">
              Staqforce Studio
              <br />
              MIT licensed · Built with StaqUI
            </span>
          </footer>
        </div>
      </div>
      <div className="density-dock">
        <ButtonGroup label="Component density" className="density-switch">
          <Button
            variant={density === "compact" ? "primary" : "tertiary"}
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
            variant={density === "comfortable" ? "primary" : "tertiary"}
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
        description="Find guides and components by name, category, or purpose."
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <SearchField
          label="Search documentation"
          hideLabel
          autoFocus
          placeholder="Search guides and components…"
          value={query}
          onValueChange={setQuery}
        />
        <div className="search-results">
          {matchingGuides.length > 0 && (
            <>
              <span className="search-section-label">Guides</span>
              {matchingGuides
                .slice(0, query.trim() ? 6 : 4)
                .map(([slug, , title]) => (
                  <Link
                    key={slug}
                    href={`/docs/${slug}`}
                    className="search-result"
                    onClick={() => setSearchOpen(false)}
                  >
                    <span>
                      <Icon name="code" size={14} /> {title}
                    </span>
                    <Text tone="muted" size="small">
                      Guide
                    </Text>
                  </Link>
                ))}
            </>
          )}
          {filtered.length > 0 && (
            <span className="search-section-label">Components</span>
          )}
          {filtered.slice(0, query.trim() ? 12 : 6).map((c) => (
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
          {!filtered.length && !matchingGuides.length && (
            <Text tone="muted">
              No results. Try “theme”, “date”, or “layout”.
            </Text>
          )}
        </div>
      </Modal>
    </StaqProvider>
  );
}
