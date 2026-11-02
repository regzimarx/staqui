import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/catalog-browser";
export const metadata: Metadata = { title: "Components" };
export default function Components() {
  return (
    <div className="content-page">
      <div className="page-heading">
        <span className="studio-kicker">THE COMPONENT INDEX / 50 PIECES</span>
        <h1>
          Everything in
          <br />
          your Staq.
        </h1>
        <p>
          Explore the system. Find the right piece, try it live, and bring it
          into your product.
        </p>
      </div>
      <CatalogBrowser />
    </div>
  );
}
