import type { Metadata } from "next";
import { SiteLink as Link } from "@/components/site-link";
import { ExampleWorkbench } from "@/components/workspace-demo";
export const metadata: Metadata = { title: "Application examples" };
export default function Examples() {
  return (
    <div className="content-page">
      <div className="page-heading">
        <span className="studio-kicker">THE COMPOSITION LAB</span>
        <h1>
          Good on their own.
          <br />
          Better together.
        </h1>
        <p>
          Three working interfaces. One shared system. Explore what happens when
          the pieces connect.
        </p>
      </div>
      <ExampleWorkbench initial="collections" />
      <div className="example-notes">
        <h2>Make it your own</h2>
        <p>
          Settings combines labeled fields, a switch, a menu and form
          validation. Collections adds search, selection, sorting, pagination
          and a creation dialog. Launch planner pairs a range calendar with a
          progress checklist.
        </p>
        <p>
          These examples use local React state. Records and settings reset when
          the page reloads; no files or data are sent to a server.
        </p>
        <Link href="/docs/getting-started">Install the package</Link>
      </div>
    </div>
  );
}
