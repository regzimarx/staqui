import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/catalog-browser";
export const metadata: Metadata = { title: "Components" };
export default function Components() {
  return (
    <div className="content-page">
      <div className="page-heading">
        <h1>
          A component for
          <br />
          every little detail.
        </h1>
        <p>50 reusable building blocks. One consistent language.</p>
      </div>
      <CatalogBrowser />
    </div>
  );
}
