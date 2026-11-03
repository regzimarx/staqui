"use client";
import { useState } from "react";
import NextLink from "next/link";
import {
  Badge,
  Banner,
  Button,
  ButtonGroup,
  Checkbox,
  EmailField,
  Icon,
  Modal,
  Stack,
  Switch,
  TextField,
} from "@staqforce-studio/staqui";

const collections = [
  {
    id: "actions",
    title: "Actions",
    icon: "arrowUpRight",
    count: "06",
    heading: "Make the next step obvious.",
    description:
      "A clear hierarchy for the things people do. Try the primary action to open a real dialog.",
    component: "button",
    names: "Button · ButtonGroup · Modal",
  },
  {
    id: "forms",
    title: "Forms",
    icon: "sliders",
    count: "17",
    heading: "A little structure. A lot of clarity.",
    description:
      "Labels, descriptions, and native input behavior, connected by the same spacing and state conventions.",
    component: "text-field",
    names: "TextField · EmailField · Button",
  },
  {
    id: "feedback",
    title: "Feedback",
    icon: "info",
    count: "05",
    heading: "Keep everyone in the loop.",
    description:
      "Status that says what happened and what comes next. Choose a tone to see the system respond.",
    component: "banner",
    names: "Banner · Badge · ButtonGroup",
  },
  {
    id: "selection",
    title: "Selection",
    icon: "check",
    count: "02",
    heading: "Small choices, clearly made.",
    description:
      "Independent settings and explicit consent. Familiar controls with visible labels and keyboard behavior.",
    component: "switch",
    names: "Switch · Checkbox · Stack",
  },
] as const;
type Collection = (typeof collections)[number]["id"];

export function HomeGallery() {
  const [active, setActive] = useState<Collection>("actions");
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("Studio workspace");
  const [email, setEmail] = useState("hello@studio.example");
  const [created, setCreated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [tone, setTone] = useState<"info" | "success" | "warning">("success");
  const current = collections.find((item) => item.id === active)!;
  const total = collections.reduce((sum, item) => sum + Number(item.count), 0);
  return (
    <div className="block-explorer">
      <div className="block-rail-head">
        <span className="studio-kicker">PICK A COLLECTION</span>
        <span className="studio-kicker">
          {String(collections.length).padStart(2, "0")} COLLECTIONS · {total}{" "}
          COMPONENTS
        </span>
      </div>
      <ButtonGroup label="Component collections" className="block-rail">
        {collections.map((item, index) => (
          <Button key={item.id} asChild>
            <button
              type="button"
              className="block-tab"
              aria-pressed={active === item.id}
              onClick={() => setActive(item.id)}
            >
              <span className="block-tab-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block-tab-count">{item.count}</span>
              <span className="block-tab-name">
                <Icon name={item.icon} size={16} />
                <span>{item.title}</span>
              </span>
            </button>
          </Button>
        ))}
      </ButtonGroup>
      <div className="block-panel">
        <div className="block-copy">
          <span className="studio-kicker">
            {current.title.toUpperCase()} / IN PRACTICE
          </span>
          <h3>{current.heading}</h3>
          <p>{current.description}</p>
          <div className="block-includes">
            <span className="studio-kicker">INCLUDES</span>
            <code>{current.names}</code>
          </div>
          <div className="block-copy-actions">
            <Button asChild size="small">
              <NextLink href={`/components/${current.component}`}>
                Explore {current.title.toLowerCase()}{" "}
                <Icon name="arrowUpRight" size={14} />
              </NextLink>
            </Button>
          </div>
        </div>
        <div className="block-stage">
          <div className="block-stage-bar">
            <span>STQ / {current.title.toUpperCase()}</span>
            <span className="block-live">
              <span /> Live preview
            </span>
          </div>
          <div
            className="block-playground"
            role="region"
            aria-label={`${current.title} component preview`}
          >
            {active === "actions" && (
              <Stack gap="6">
                <ButtonGroup label="Action hierarchy">
                  <Modal
                    title="Create a project"
                    description="Create a project in this local component example."
                    open={open}
                    onOpenChange={setOpen}
                    trigger={
                      <Button
                        variant="primary"
                        icon={<Icon name="plus" size={16} />}
                      >
                        Create project
                      </Button>
                    }
                  >
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        setCreated(true);
                        setOpen(false);
                      }}
                    >
                      <Stack>
                        <TextField
                          label="Project name"
                          value={project}
                          onValueChange={setProject}
                          required
                        />
                        <Button type="submit" variant="primary">
                          Create project
                        </Button>
                      </Stack>
                    </form>
                  </Modal>
                  <Button
                    onClick={() => {
                      setCreated(false);
                      setProject("Studio workspace");
                    }}
                  >
                    Reset example
                  </Button>
                  <Button asChild variant="tertiary">
                    <NextLink href="/components/button">
                      View API <Icon name="arrowUpRight" size={16} />
                    </NextLink>
                  </Button>
                </ButtonGroup>
                <div className="block-state-row">
                  <span className="studio-kicker">EVERY STATE HAS A PLACE</span>
                  <ButtonGroup label="Action states">
                    <Button disabled>Unavailable</Button>
                    <Button loading>Saving</Button>
                    <Button tone="critical" disabled>
                      Delete project
                    </Button>
                  </ButtonGroup>
                </div>
                {created && (
                  <Banner tone="success" title="Project created">
                    {project} is ready in this local example.
                  </Banner>
                )}
              </Stack>
            )}
            {active === "forms" && (
              <form
                className="block-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSaved(true);
                }}
              >
                <Stack>
                  <TextField
                    label="Workspace name"
                    description="A name your team will recognize."
                    value={project}
                    onValueChange={(value) => {
                      setProject(value);
                      setSaved(false);
                    }}
                    required
                  />
                  <EmailField
                    label="Team email"
                    value={email}
                    onValueChange={(value) => {
                      setEmail(value);
                      setSaved(false);
                    }}
                    required
                  />
                  <div>
                    <Button type="submit" variant="primary">
                      Save workspace
                    </Button>
                  </div>
                  {saved && (
                    <Banner tone="success" title="Workspace saved">
                      Your changes are saved in this local example.
                    </Banner>
                  )}
                </Stack>
              </form>
            )}
            {active === "feedback" && (
              <Stack gap="6">
                <ButtonGroup label="Feedback tone">
                  {(["info", "success", "warning"] as const).map((value) => (
                    <Button
                      key={value}
                      variant={tone === value ? "primary" : "secondary"}
                      aria-pressed={tone === value}
                      onClick={() => setTone(value)}
                    >
                      {value === "info"
                        ? "Information"
                        : value === "success"
                          ? "Success"
                          : "Warning"}
                    </Button>
                  ))}
                </ButtonGroup>
                <Banner
                  tone={tone}
                  title={
                    tone === "success"
                      ? "All changes published"
                      : tone === "warning"
                        ? "A few details need your attention"
                        : "Your workspace is up to date"
                  }
                >
                  {tone === "warning"
                    ? "Review the remaining details before publishing."
                    : "Your team can keep working with the latest version."}
                </Banner>
                <ButtonGroup label="Example status badges">
                  <Badge tone="success">Published</Badge>
                  <Badge tone="warning">In review</Badge>
                  <Badge>Draft</Badge>
                </ButtonGroup>
              </Stack>
            )}
            {active === "selection" && (
              <Stack gap="6">
                <Switch
                  label="Email notifications"
                  description="Get a message when your team makes an update."
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
                <Checkbox
                  label="Include me in the weekly digest"
                  defaultChecked
                />
                <Checkbox label="Share product updates with the team" />
                <span className="block-selection-summary" aria-live="polite">
                  Email notifications are {notifications ? "on" : "off"}.
                </span>
              </Stack>
            )}
          </div>
          <div className="block-stage-foot">
            <span>Same props. Same styles.</span>
            <span>
              {current.count} / {total} COMPONENTS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
