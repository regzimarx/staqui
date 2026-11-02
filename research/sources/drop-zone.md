# DropZone

Accept files through a native chooser or drag and drop.

## Implementation

Files remain local and are passed to onFilesChange. Type, count and maximum bytes are checked on both chooser and drop paths. No upload service, directory traversal or content scanning. Applications must submit callback files for drag-and-drop; native file FormData covers chooser selections only.

## Accessibility

Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

## Example

`packages/ui/examples/drop-zone.tsx`

## API

Generated from `packages/ui/src` by `scripts/generate-docs.mjs`.
