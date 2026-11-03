import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Tabs } from "../src";

const items = [
  { value: "overview", label: "Overview", content: "Summary" },
  { value: "billing", label: "Billing", content: "Invoices", disabled: true },
  { value: "activity", label: "Activity", content: "Updates" },
];

it("moves focus and selection across enabled tabs and exposes their panels", async () => {
  const user = userEvent.setup();
  render(<Tabs label="Project views" items={items} />);
  const overview = screen.getByRole("tab", { name: "Overview" });
  const activity = screen.getByRole("tab", { name: "Activity" });

  await user.tab();
  expect(overview).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(activity).toHaveFocus();
  expect(activity).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tabpanel", { name: "Activity" })).toHaveTextContent(
    "Updates",
  );
  expect(screen.queryByRole("tabpanel", { name: "Overview" })).toBeNull();
  await user.keyboard("{Home}");
  expect(overview).toHaveFocus();
  expect(overview).toHaveAttribute("aria-selected", "true");
});

it("reports selection and follows the controlled value", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const view = render(
    <Tabs
      label="Project views"
      items={items}
      value="overview"
      onValueChange={change}
    />,
  );
  await user.click(screen.getByRole("tab", { name: "Activity" }));
  expect(change).toHaveBeenCalledWith("activity");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Summary");
  view.rerender(
    <Tabs
      label="Project views"
      items={items}
      value="activity"
      onValueChange={change}
    />,
  );
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Updates");
});
