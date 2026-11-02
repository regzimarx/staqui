import { EmptyState } from "@staqforce/staqui";
import { SiteLink as Link } from "@/components/site-link";
export default function NotFound() {
  return (
    <div className="content-page">
      <EmptyState
        title="This page isn’t in the stack."
        action={
          <Link href="/components" variant="button">
            Browse components
          </Link>
        }
      >
        Find what you need in the component catalog.
      </EmptyState>
    </div>
  );
}
