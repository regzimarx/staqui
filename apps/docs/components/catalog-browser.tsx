/* Hallmark · waive 26b · StaqUI shared stylesheet defines active and disabled states · This module consumes styled library controls; duplicating their CSS would break the single source of truth. */
"use client";
import { useState } from "react";
import { Badge, Button, EmptyState, Icon, SearchField } from "@staqui/ui";
import { SiteLink as Link } from "@/components/site-link";
import { categories, searchCatalog } from "@/lib/catalog";
export function CatalogBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const results = searchCatalog(query).filter(
    (c) => category === "All" || c.category === category,
  );
  return (
    <>
      <div className="catalog-controls">
        <SearchField
          label="Search components"
          hideLabel
          placeholder="Find a component…"
          value={query}
          onValueChange={setQuery}
        />
        <div
          className="category-filters"
          role="group"
          aria-label="Filter by category"
        >
          {["All", ...categories].map((c) => (
            <Button
              key={c}
              variant="tertiary"
              size="small"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {results.length} {results.length === 1 ? "component" : "components"}
        {category !== "All" ? ` in ${category.toLowerCase()}` : ""}
      </p>
      <div className="catalog-grid">
        {results.map((c) => (
          <Link
            key={c.slug}
            href={`/components/${c.slug}`}
            className="catalog-card"
          >
            <div>
              <Icon
                name={
                  c.category === "Forms"
                    ? "sliders"
                    : c.category === "Actions"
                      ? "arrowUpRight"
                      : c.category === "Media"
                        ? "package"
                        : c.category === "Feedback"
                          ? "info"
                          : c.category === "Overlays"
                            ? "layers"
                            : "code"
                }
                size={20}
              />
              <span>{c.category}</span>
            </div>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
          </Link>
        ))}
      </div>
      {!results.length && (
        <EmptyState
          title="No matching components"
          action={
            <Button
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </Button>
          }
        >
          Try a different name or category.
        </EmptyState>
      )}
    </>
  );
}
