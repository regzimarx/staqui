"use client";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  StaqProvider,
  useStaq,
} from "@staqforce-studio/staqui";
import { CopyButton } from "./code-block";
const commands = {
  npm: "npm install @staqforce-studio/staqui",
  pnpm: "pnpm add @staqforce-studio/staqui",
  yarn: "yarn add @staqforce-studio/staqui",
  bun: "bun add @staqforce-studio/staqui",
};
export function InstallCommand() {
  const [manager, setManager] = useState<keyof typeof commands>("npm");
  return (
    <StaqProvider theme="dark" className="install-command">
      <div className="install-command-toolbar">
        <ButtonGroup label="Package manager">
          {(Object.keys(commands) as (keyof typeof commands)[]).map((name) => (
            <Button
              key={name}
              variant={manager === name ? "primary" : "tertiary"}
              size="small"
              aria-pressed={manager === name}
              onClick={() => setManager(name)}
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
        <CopyButton
          key={manager}
          text={commands[manager]}
          label="Copy install command"
        />
      </div>
      <pre
        tabIndex={0}
        aria-label={`${manager} install command`}
        aria-live="polite"
      >
        <code>{commands[manager]}</code>
      </pre>
    </StaqProvider>
  );
}
