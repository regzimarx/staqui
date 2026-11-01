"use client";
import {
  Badge,
  Button,
  Checkbox,
  Icon,
  Stack,
  Switch,
  TextField,
  Avatar,
  Progress,
  Modal,
} from "@staqui/ui";
import { SiteLink as Link } from "@/components/site-link";
import { useState } from "react";
export function HomeGallery() {
  const [value, setValue] = useState(true);
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState("Something good");
  const [created, setCreated] = useState(false);
  return (
    <section className="home-gallery">
      <div className="section-heading">
        <div>
          <h2>The details, already considered.</h2>
          <p>From a single input to a complete workflow.</p>
        </div>
        <Link href="/components">View all 50 components</Link>
      </div>
      <div className="gallery-grid">
        <article className="gallery-tile">
          <div className="gallery-preview">
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
          <Link href="/components/button">
            Actions <Icon name="arrowUpRight" size={14} />
          </Link>
          <p>Clear intent at every step.</p>
        </article>
        <article className="gallery-tile">
          <div className="gallery-preview">
            <TextField
              label="Project name"
              value={project}
              onValueChange={setProject}
              description={
                created ? "Created in this local example" : undefined
              }
            />
          </div>
          <Link href="/components/text-field">
            Forms <Icon name="arrowUpRight" size={14} />
          </Link>
          <p>A familiar place for every input.</p>
        </article>
        <article className="gallery-tile">
          <div className="gallery-preview">
            <Stack direction="row" gap="2">
              <Badge tone="success">Published</Badge>
              <Badge tone="warning">In review</Badge>
              <Badge>Draft</Badge>
            </Stack>
          </div>
          <Link href="/components/badge">
            Feedback <Icon name="arrowUpRight" size={14} />
          </Link>
          <p>Useful signals, without the noise.</p>
        </article>
        <article className="gallery-tile">
          <div className="gallery-preview">
            <Stack direction="row" gap="6">
              <Switch
                label="Notifications"
                checked={value}
                onCheckedChange={setValue}
              />
              <Checkbox label="Selected" defaultChecked />
            </Stack>
          </div>
          <Link href="/components/switch">
            Selection <Icon name="arrowUpRight" size={14} />
          </Link>
          <p>Small controls. Clear choices.</p>
        </article>
      </div>
    </section>
  );
}
