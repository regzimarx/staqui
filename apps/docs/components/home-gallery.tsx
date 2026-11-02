"use client";
import {
  Badge,
  Button,
  Checkbox,
  Icon,
  Paragraph,
  Stack,
  Switch,
  Text,
  TextField,
  Modal,
} from "@staqforce-studio/staqui";
import { SiteLink as Link } from "@/components/site-link";
import { useState } from "react";

export function HomeGallery() {
  const [value, setValue] = useState(true);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("Something good");
  const [created, setCreated] = useState(false);
  return (
    <div className="home-gallery">
      <article className="specimen">
        <header className="specimen-bar">
          <Text className="lp-mono">01</Text>
          <Text className="lp-mono">Actions</Text>
        </header>
        <div className="specimen-stage lp-paper">
          <Stack direction="row" gap="2">
            <Modal
              title="Create a project"
              description="This example creates a local project. No data is sent to a server."
              open={open}
              onOpenChange={setOpen}
              trigger={
                <Button
                  variant="primary"
                  icon={<Icon name="plus" size={15} />}
                >
                  Create project
                </Button>
              }
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (project.trim()) {
                    setCreated(true);
                    setOpen(false);
                  }
                }}
              >
                <Stack>
                  <TextField
                    label="New project name"
                    value={project}
                    onValueChange={setProject}
                    required
                    autoFocus
                  />
                  <Button type="submit" variant="primary">
                    Create locally
                  </Button>
                </Stack>
              </form>
            </Modal>
            <Button
              onClick={() => {
                setCreated(false);
                setProject("Something good");
              }}
            >
              Reset
            </Button>
          </Stack>
        </div>
        <div className="specimen-foot">
          <Paragraph tone="muted">
            Clear intent at every step, including the destructive ones.
          </Paragraph>
          <Link href="/components/button" className="lp-more">
            Button <Icon name="arrowUpRight" size={13} />
          </Link>
        </div>
      </article>

      <article className="specimen">
        <header className="specimen-bar">
          <Text className="lp-mono">02</Text>
          <Text className="lp-mono">Forms</Text>
        </header>
        <div className="specimen-stage lp-paper">
          <TextField
            label="Project name"
            value={project}
            onValueChange={setProject}
            description={created ? "Created in this local example" : undefined}
          />
        </div>
        <div className="specimen-foot">
          <Paragraph tone="muted">
            A familiar place for every input.
          </Paragraph>
          <Link href="/components/text-field" className="lp-more">
            Text field <Icon name="arrowUpRight" size={13} />
          </Link>
        </div>
      </article>

      <article className="specimen">
        <header className="specimen-bar">
          <Text className="lp-mono">03</Text>
          <Text className="lp-mono">Feedback</Text>
        </header>
        <div className="specimen-stage lp-paper">
          <Stack direction="row" gap="2">
            <Badge tone="success">Published</Badge>
            <Badge tone="warning">In review</Badge>
            <Badge>Draft</Badge>
          </Stack>
        </div>
        <div className="specimen-foot">
          <Paragraph tone="muted">
            Useful signals, without the noise.
          </Paragraph>
          <Link href="/components/badge" className="lp-more">
            Badge <Icon name="arrowUpRight" size={13} />
          </Link>
        </div>
      </article>

      <article className="specimen">
        <header className="specimen-bar">
          <Text className="lp-mono">04</Text>
          <Text className="lp-mono">Selection</Text>
        </header>
        <div className="specimen-stage lp-paper">
          <Stack direction="row" gap="6">
            <Switch
              label="Notifications"
              checked={value}
              onCheckedChange={setValue}
            />
            <Checkbox label="Selected" defaultChecked />
          </Stack>
        </div>
        <div className="specimen-foot">
          <Paragraph tone="muted">Small controls. Clear choices.</Paragraph>
          <Link href="/components/switch" className="lp-more">
            Switch <Icon name="arrowUpRight" size={13} />
          </Link>
        </div>
      </article>
    </div>
  );
}
