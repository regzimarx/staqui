"use client";
import { PasswordField } from "@staqforce/staqui";

export default function PasswordFieldExample() {
  return (
    <PasswordField
      label="Password"
      autoComplete="new-password"
      minLength={12}
      description="Use at least 12 characters."
    />
  );
}
