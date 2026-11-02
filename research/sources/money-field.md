# MoneyField

Enter a decimal amount with an explicit currency.

## Implementation

Currency symbol and code use Intl.NumberFormat; input remains an ungrouped decimal string for predictable editing. This is not financial arithmetic, exchange conversion or locale-specific currency parsing.

## Accessibility

Use a persistent visible label and provide textual errors; native controls support keyboard input and browser form constraints.

## Example

`packages/ui/examples/money-field.tsx`

## API

Generated from `packages/ui/src` by `scripts/generate-docs.mjs`.
