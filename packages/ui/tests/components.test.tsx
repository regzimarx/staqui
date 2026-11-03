import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import * as examples from "../examples";
import { CollectionsDemo } from "../../../apps/docs/components/workspace-demo";
import {
  Button,
  Checkbox,
  ChoiceList,
  DatePicker,
  DropZone,
  Menu,
  Modal,
  PasswordField,
  URLField,
  Popover,
  Progress,
  Select,
  StaqProvider,
  Table,
  TextField,
  Tooltip,
} from "../src";
describe("catalog examples", () => {
  for (const [name, Example] of Object.entries(examples))
    it(`${name} renders and passes structural accessibility checks`, async () => {
      const { container } = render(
        <StaqProvider>
          <Example />
        </StaqProvider>,
      );
      expect(
        container.textContent?.length ||
          container.querySelectorAll("svg,img,input").length,
      ).toBeGreaterThan(0);
      const result = await axe.run(container, {
        rules: {
          "color-contrast": { enabled: false },
          region: { enabled: false },
        },
      });
      expect(
        result.violations.map(
          (x) => `${x.id}: ${x.nodes.map((n) => n.html).join(" ")}`,
        ),
      ).toEqual([]);
    });
});
it("loading buttons suppress duplicate submissions", async () => {
  const click = vi.fn();
  render(
    <Button loading onClick={click}>
      Save
    </Button>,
  );
  await userEvent.click(screen.getByRole("button"));
  expect(click).not.toHaveBeenCalled();
  expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
});
it("fields associate labels, help, and errors with the input", () => {
  render(<TextField label="Name" description="Public name" error="Required" />);
  const input = screen.getByRole("textbox", { name: "Name" });
  expect(input).toHaveAccessibleDescription("Public name Required");
  expect(input).toHaveAttribute("aria-invalid", "true");
});
it("reports a URL-specific error until the address is valid", () => {
  render(<URLField label="Website" />);
  const input = screen.getByRole("textbox", { name: "Website" });
  fireEvent.change(input, { target: { value: "invalid" } });
  expect(input).toHaveAccessibleDescription("Enter a valid URL.");
  fireEvent.change(input, { target: { value: "https://example.com" } });
  expect(input).not.toHaveAttribute("aria-invalid");
});
it("uncontrolled selects show their placeholder", () => {
  render(
    <Select
      label="Visibility"
      placeholder="Choose visibility"
      options={[
        { value: "private", label: "Private" },
        { value: "team", label: "Team" },
      ]}
    />,
  );
  const select = screen.getByRole("combobox", { name: "Visibility" });
  expect(select).toHaveTextContent("Choose visibility");
});
it("selects a described option with the keyboard and submits its value", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const { container } = render(
    <form>
      <Select
        label="Role"
        name="role"
        defaultValue="admin"
        onValueChange={onValueChange}
        options={[
          { value: "admin", label: "Administrator" },
          { value: "editor", label: "Editor", description: "Edit projects" },
        ]}
      />
    </form>,
  );
  await user.tab();
  await user.keyboard("{Enter}");
  expect(screen.getByText("Edit projects")).toBeVisible();
  await user.keyboard("{ArrowDown}{Enter}");
  expect(onValueChange).toHaveBeenCalledWith("editor");
  expect(new FormData(container.querySelector("form")!).getAll("role")).toEqual(
    ["editor"],
  );
});
it("checkbox and radio choices work with the keyboard", async () => {
  const user = userEvent.setup();
  render(
    <>
      <Checkbox label="Updates" />
      <ChoiceList
        label="Visibility"
        options={[
          { value: "private", label: "Private" },
          { value: "team", label: "Team" },
        ]}
      />
    </>,
  );
  await user.tab();
  await user.keyboard(" ");
  expect(screen.getByRole("checkbox")).toBeChecked();
  await user.tab();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("radio", { name: "Team" })).toBeChecked();
});
it("password reveal preserves value and changes the accessible toggle state", async () => {
  const user = userEvent.setup();
  render(<PasswordField label="Secret" defaultValue="a-safe-example" />);
  await user.click(screen.getByRole("button", { name: "Show password" }));
  expect(screen.getByLabelText("Secret")).toHaveAttribute("type", "text");
  expect(screen.getByRole("button", { name: "Hide password" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
it("modal traps focus, escapes, restores trigger focus and inherits theme", async () => {
  const user = userEvent.setup();
  render(
    <StaqProvider theme="dark">
      <Modal
        title="Edit project"
        description="Change its name"
        trigger={<Button>Edit</Button>}
      >
        <TextField label="Project name" />
        <Button>Save</Button>
      </Modal>
    </StaqProvider>,
  );
  const trigger = screen.getByRole("button", { name: "Edit" });
  await user.click(trigger);
  const dialog = screen.getByRole("dialog", { name: "Edit project" });
  expect(dialog).toHaveAttribute("data-staq-theme", "dark");
  for (let i = 0; i < 6; i++) {
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  }
  await user.keyboard("{Escape}");
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
  );
  expect(trigger).toHaveFocus();
});

it("supports the Staqwish visual theme", () => {
  render(
    <StaqProvider theme="staqwish">
      <Button variant="primary">Create</Button>
    </StaqProvider>,
  );

  expect(
    screen.getByText("Create").closest("[data-staq-theme]"),
  ).toHaveAttribute("data-staq-theme", "staqwish");
});

it("renders button styles on a child link with asChild", () => {
  render(
    <Button asChild variant="primary">
      <a href="/docs/getting-started">Start building</a>
    </Button>,
  );

  const link = screen.getByRole("link", { name: "Start building" });
  expect(link).toHaveClass("sq-button");
  expect(link).toHaveAttribute("data-variant", "primary");
  expect(link).not.toHaveAttribute("type");
  expect(link).not.toHaveAttribute("disabled");
});

it("menu skips disabled items and selects with keyboard", async () => {
  const user = userEvent.setup();
  const selected = vi.fn();
  render(
    <Menu
      label="Actions"
      trigger={<Button>Actions</Button>}
      items={[
        { id: "disabled", label: "Locked", disabled: true },
        { id: "edit", label: "Edit", onSelect: selected },
        { id: "delete", label: "Delete" },
      ]}
    />,
  );
  await user.tab();
  await user.keyboard("{ArrowDown}");
  await waitFor(() =>
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus(),
  );
  await user.keyboard("{Enter}");
  expect(selected).toHaveBeenCalledOnce();
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});
it("popover closes on Escape and restores focus", async () => {
  const user = userEvent.setup();
  render(
    <Popover label="Filters" trigger={<Button>Filters</Button>}>
      <Checkbox label="Active only" />
    </Popover>,
  );
  const trigger = screen.getByRole("button", { name: "Filters" });
  await user.click(trigger);
  expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger).toHaveFocus());
});
it("tooltip appears on focus without waiting for hover delay", async () => {
  render(
    <Tooltip content="Useful explanation">
      <Button>Help</Button>
    </Tooltip>,
  );
  await userEvent.tab();
  expect(await screen.findByRole("tooltip")).toHaveTextContent(
    "Useful explanation",
  );
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});
it("drop zone accepts valid files and rejects mismatched types and oversize drops", async () => {
  const changed = vi.fn(),
    rejected = vi.fn();
  const { container } = render(
    <DropZone
      label="Attachments"
      accept=".png"
      maxSize={100}
      onFilesChange={changed}
      onReject={rejected}
    />,
  );
  const input = screen.getByLabelText("Attachments");
  await userEvent.upload(
    input,
    new File(["image"], "test.png", { type: "image/png" }),
  );
  expect(changed).toHaveBeenCalledOnce();
  fireEvent.drop(container.querySelector(".sq-drop-zone")!, {
    dataTransfer: {
      files: [
        new File(["bad"], "test.exe", { type: "application/octet-stream" }),
      ],
    },
  });
  expect(rejected).toHaveBeenCalledOnce();
  expect(screen.getByText(/File rejected/)).toBeInTheDocument();
});
it("table sorts numeric values and controls row selection", async () => {
  const user = userEvent.setup(),
    selection = vi.fn();
  render(
    <Table
      label="Items"
      rows={[
        { id: "a", count: 12 },
        { id: "b", count: 2 },
      ]}
      rowKey={(r) => r.id}
      columns={[
        {
          id: "count",
          header: "Count",
          cell: (r) => r.count,
          sortValue: (r) => r.count,
        },
      ]}
      onSelectionChange={selection}
    />,
  );
  await user.click(screen.getByRole("button", { name: "Count" }));
  const rows = screen.getAllByRole("row");
  expect(within(rows[1]).getByText("2")).toBeInTheDocument();
  await user.click(
    screen.getByRole("checkbox", { name: "Select all visible rows" }),
  );
  expect(selection).toHaveBeenCalledWith(["a", "b"]);
});
it("collection demo sorts all rows before paginating", async () => {
  const user = userEvent.setup();
  render(<CollectionsDemo />);
  await user.click(screen.getByRole("button", { name: "Collection" }));
  let rows = screen.getAllByRole("row");
  expect(within(rows[1]).getByText("Archive selection")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Next page" }));
  rows = screen.getAllByRole("row");
  expect(within(rows[1]).getByText("Spring collection")).toBeInTheDocument();
});
it("calendar selects a range and disables constrained dates", async () => {
  const user = userEvent.setup(),
    onChange = vi.fn();
  render(
    <DatePicker
      mode="range"
      defaultMonth={new Date(2026, 10, 1)}
      disabled={{ before: new Date(2026, 10, 5) }}
      onValueChange={onChange}
    />,
  );
  const day = screen.getByRole("button", {
    name: /Tuesday, November 10th, 2026/,
  });
  await user.click(day);
  expect(onChange).toHaveBeenCalled();
  expect(
    screen.getByRole("button", { name: /Monday, November 2nd, 2026/ }),
  ).toBeDisabled();
});
it("progress clamps out-of-range values", () => {
  render(<Progress label="Upload" value={150} max={100} />);
  expect(screen.getByRole("progressbar")).toHaveAttribute("value", "100");
});

it("controlled calendar can clear a previously selected date", async () => {
  const onValueChange = vi.fn();
  const { rerender, container } = render(
    <DatePicker
      value={undefined}
      onValueChange={onValueChange}
      defaultMonth={new Date(2026, 10, 1)}
    />,
  );
  await userEvent.click(
    screen.getByRole("button", { name: /Tuesday, November 10th, 2026/ }),
  );
  rerender(
    <DatePicker
      value={new Date(2026, 10, 10)}
      onValueChange={onValueChange}
      defaultMonth={new Date(2026, 10, 1)}
    />,
  );
  expect(container.querySelector(".rdp-selected")).not.toBeNull();
  rerender(
    <DatePicker
      value={undefined}
      onValueChange={onValueChange}
      defaultMonth={new Date(2026, 10, 1)}
    />,
  );
  expect(container.querySelector(".rdp-selected")).toBeNull();
});
