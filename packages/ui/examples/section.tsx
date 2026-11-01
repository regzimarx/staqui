"use client";
import { Section, Switch } from "@staqui/ui";

export default function SectionExample() {
  return (
    <Section heading="Notifications" description="Choose how you hear from us.">
      <Switch label="Weekly digest" defaultChecked />
    </Section>
  );
}
