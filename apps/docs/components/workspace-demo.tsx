"use client";
import { useState } from "react";
import {
  Avatar,
  Badge,
  Banner,
  Button,
  ButtonGroup,
  Checkbox,
  ChoiceList,
  DatePicker,
  Divider,
  EmptyState,
  Icon,
  Menu,
  Modal,
  Progress,
  SearchField,
  Select,
  Stack,
  Switch,
  Table,
  Text,
  TextField,
  type DateRange,
} from "@staqforce-studio/staqui";
export function SettingsDemo({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("North studio");
  const [email, setEmail] = useState("hello@north.example");
  const [notifications, setNotifications] = useState(true);
  const [access, setAccess] = useState("team");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      className="settings-demo"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) {
          setError("Enter a workspace name.");
          return;
        }
        setError("");
        setSaved(true);
      }}
    >
      <div className="demo-heading">
        <div>
          <h2>Workspace settings</h2>
          <p>A little space to make your own.</p>
        </div>
        <Badge tone="success" icon={<Icon name="check" size={12} />}>
          Active
        </Badge>
      </div>
      <div className="demo-avatar-row">
        <Avatar name={name || "Workspace"} size="large" />
        <div>
          <strong>{name || "Your workspace"}</strong>
          <Text size="small" tone="muted">
            Personal workspace
          </Text>
        </div>
        <Menu
          label="Workspace actions"
          trigger={
            <Button
              variant="tertiary"
              size="small"
              aria-label="Workspace actions"
            >
              <Icon name="settings" />
            </Button>
          }
          items={[
            {
              id: "reset",
              label: "Reset example",
              onSelect: () => {
                setName("North studio");
                setEmail("hello@north.example");
                setSaved(false);
              },
            },
            {
              id: "help",
              label: "View documentation",
              href: "/components/menu",
            },
          ]}
        />
      </div>
      <Divider />
      <div className="settings-fields">
        <TextField
          label="Workspace name"
          value={name}
          onValueChange={(v) => {
            setName(v);
            setSaved(false);
          }}
          error={error || undefined}
          required
        />
        <TextField
          label="Contact email"
          type="email"
          value={email}
          onValueChange={(v) => {
            setEmail(v);
            setSaved(false);
          }}
          required
        />
        {!compact && (
          <Select
            label="Default access"
            value={access}
            onValueChange={(v) => {
              setAccess(v);
              setSaved(false);
            }}
            options={[
              { value: "team", label: "Everyone in the workspace" },
              { value: "private", label: "Invited members only" },
            ]}
          />
        )}
      </div>
      <div className="demo-setting-row">
        <div>
          <strong>Email notifications</strong>
          <Text tone="muted" size="small">
            Keep up with your workspace.
          </Text>
        </div>
        <Switch
          label="Email notifications"
          hideLabel
          checked={notifications}
          onCheckedChange={(v) => {
            setNotifications(v);
            setSaved(false);
          }}
        />
      </div>
      <div className="demo-footer">
        <Text tone="muted" size="small">
          {saved
            ? "Saved in this local example"
            : "Changes stay in this browser"}
        </Text>
        <Button
          type="submit"
          variant="primary"
          icon={<Icon name="check" size={14} />}
        >
          Save changes
        </Button>
      </div>
    </form>
  );
}
const initialProjects = [
  {
    id: "ST-001",
    name: "Essentials collection",
    owner: "Maya Chen",
    status: "Published",
    items: 24,
  },
  {
    id: "ST-002",
    name: "Studio favorites",
    owner: "Alex Rivera",
    status: "Draft",
    items: 12,
  },
  {
    id: "ST-003",
    name: "Spring collection",
    owner: "Sam Patel",
    status: "In review",
    items: 36,
  },
  {
    id: "ST-004",
    name: "Everyday objects",
    owner: "Maya Chen",
    status: "Published",
    items: 18,
  },
  {
    id: "ST-005",
    name: "Archive selection",
    owner: "Alex Rivera",
    status: "Draft",
    items: 8,
  },
];
export function CollectionsDemo() {
  const [rows, setRows] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<{
    column: string;
    direction: "ascending" | "descending";
  }>();
  const filtered = rows.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()),
  );
  const sorted = sort
    ? [...filtered].sort((a, b) => {
        const av = sort.column === "items" ? a.items : a.name;
        const bv = sort.column === "items" ? b.items : b.name;
        return (
          (typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv))) *
          (sort.direction === "descending" ? -1 : 1)
        );
      })
    : filtered;
  const pageRows = sorted.slice(page * 3, page * 3 + 3);
  return (
    <div className="collections-demo">
      <div className="demo-heading">
        <div>
          <h2>Collections</h2>
          <p>Sample records. Real interactions.</p>
        </div>
        <Modal
          title="New collection"
          description="Create a sample collection in this browser session."
          trigger={
            <Button
              variant="primary"
              size="small"
              icon={<Icon name="plus" size={14} />}
            >
              New collection
            </Button>
          }
          open={open}
          onOpenChange={setOpen}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              setRows([
                ...rows,
                {
                  id: `ST-${String(rows.length + 1).padStart(3, "0")}`,
                  name: name.trim(),
                  owner: "You",
                  status: "Draft",
                  items: 0,
                },
              ]);
              setName("");
              setQuery("");
              setPage(Math.floor(rows.length / 3));
              setOpen(false);
            }}
          >
            <Stack>
              <TextField
                label="Collection name"
                value={name}
                onValueChange={setName}
                required
                autoFocus
              />
              <Button type="submit" variant="primary">
                Create locally
              </Button>
            </Stack>
          </form>
        </Modal>
      </div>
      <div className="collection-controls">
        <SearchField
          label="Search collections"
          hideLabel
          value={query}
          onValueChange={(v) => {
            setQuery(v);
            setPage(0);
            setSelected([]);
          }}
          placeholder="Search collections…"
        />
        {selected.length > 0 && (
          <Button
            onClick={() => {
              setRows(
                rows.map((r) =>
                  selected.includes(r.id) ? { ...r, status: "Published" } : r,
                ),
              );
              setSelected([]);
            }}
          >
            Publish {selected.length}
          </Button>
        )}
      </div>
      <Table
        label="Sample collections"
        rows={pageRows}
        sort={sort}
        onSortChange={setSort}
        rowKey={(r) => r.id}
        selected={selected}
        onSelectionChange={setSelected}
        columns={[
          {
            id: "name",
            header: "Collection",
            cell: (r) => (
              <span className="table-name">
                <Icon name="package" size={17} />
                {r.name}
              </span>
            ),
            sortValue: (r) => r.name,
          },
          {
            id: "status",
            header: "Status",
            cell: (r) => (
              <Badge
                tone={
                  r.status === "Published"
                    ? "success"
                    : r.status === "In review"
                      ? "warning"
                      : "neutral"
                }
              >
                {r.status}
              </Badge>
            ),
          },
          {
            id: "items",
            header: "Items",
            cell: (r) => r.items,
            sortValue: (r) => r.items,
            align: "end",
          },
        ]}
        pagination={{
          hasPrevious: page > 0,
          hasNext: (page + 1) * 3 < filtered.length,
          onPrevious: () => setPage(page - 1),
          onNext: () => setPage(page + 1),
          label: `${filtered.length ? page * 3 + 1 : 0}–${Math.min((page + 1) * 3, filtered.length)} of ${filtered.length} collections`,
        }}
      />
    </div>
  );
}
export function LaunchDemo() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 10, 10),
    to: new Date(2026, 10, 14),
  });
  const [steps, setSteps] = useState([true, true, false, false]);
  return (
    <div className="launch-demo">
      <div className="demo-heading">
        <div>
          <h2>Plan the next release</h2>
          <p>A checklist and a little breathing room.</p>
        </div>
        <Badge tone="info">In progress</Badge>
      </div>
      <div className="launch-grid">
        <div>
          <Progress
            label="Launch readiness"
            value={steps.filter(Boolean).length}
            max={4}
          />
          <Stack gap="3" className="launch-checks">
            {[
              "Review content",
              "Check accessibility",
              "Invite the team",
              "Publish collection",
            ].map((label, index) => (
              <Checkbox
                key={label}
                label={label}
                checked={steps[index]}
                onCheckedChange={(v) =>
                  setSteps(steps.map((s, i) => (i === index ? v : s)))
                }
              />
            ))}
          </Stack>
          <Text tone="muted" size="small">
            Select a launch window in the calendar.
          </Text>
        </div>
        <DatePicker
          label="Launch window"
          mode="range"
          defaultMonth={new Date(2026, 10, 1)}
          value={range}
          onValueChange={setRange}
        />
      </div>
    </div>
  );
}
export function ExampleWorkbench({
  initial = "settings",
}: {
  initial?: "settings" | "collections" | "launch";
}) {
  const [tab, setTab] = useState(initial);
  const tabs = [
    { id: "settings", name: "Settings", icon: "settings" },
    { id: "collections", name: "Collections", icon: "package" },
    { id: "launch", name: "Launch planner", icon: "check" },
  ] as const;
  return (
    <div className="workbench">
      <div className="workbench-bar">
        <div
          className="workbench-tabs"
          role="tablist"
          aria-label="Application example"
        >
          {tabs.map((t, index) => (
            <button
              key={t.id}
              role="tab"
              id={`workbench-tab-${t.id}`}
              aria-controls={`workbench-panel-${t.id}`}
              aria-selected={tab === t.id}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => {
                let i = index;
                if (e.key === "ArrowRight") i = (index + 1) % 3;
                else if (e.key === "ArrowLeft") i = (index + 2) % 3;
                else if (e.key === "Home") i = 0;
                else if (e.key === "End") i = 2;
                else return;
                e.preventDefault();
                setTab(tabs[i].id);
                document.getElementById(`workbench-tab-${tabs[i].id}`)?.focus();
              }}
            >
              <Icon name={t.icon} size={15} />
              {t.name}
            </button>
          ))}
        </div>
        <span className="workbench-label">Interactive example</span>
      </div>
      <div
        className="workbench-canvas"
        role="tabpanel"
        id={`workbench-panel-${tab}`}
        aria-labelledby={`workbench-tab-${tab}`}
        tabIndex={0}
      >
        {tab === "settings" ? (
          <SettingsDemo />
        ) : tab === "collections" ? (
          <CollectionsDemo />
        ) : (
          <LaunchDemo />
        )}
      </div>
      <div className="workbench-foot">
        <span>
          <Icon name="layers" size={14} />
          Built entirely with staqui
        </span>
        <LinkToComponents />
      </div>
    </div>
  );
}
function LinkToComponents() {
  return (
    <a className="sq-link" href="/components">
      Explore the components
    </a>
  );
}
