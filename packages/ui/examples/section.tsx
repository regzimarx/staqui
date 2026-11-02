"use client";
import { Section, Switch } from "@staqforce/staqui";

export default function SectionExample() {
  return (
    <Section heading="Notifications" description="Choose how you hear from us.">
      <Switch label="Weekly digest" defaultChecked />
    </Section>
  );
}
