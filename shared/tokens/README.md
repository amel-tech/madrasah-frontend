# @madrasah/tokens

Design tokens package for Madrasah projects, optimized for Tailwind CSS v4 with semantic naming conventions.

## Installation

```bash
npm install @madrasah/tokens
```

## Architecture

This package provides a clean, semantic token system with domain-specific namespacing:

- **Background Colors**: `--background-color-{category}-{variant}`
- **Text Colors**: `--text-color-{category}-{variant}`
- **Border Colors**: `--border-color-{category}-{variant}`

### Token Categories

- **neutral**: Neutral grays and whites
- **neutralinverse**: Dark theme variants
- **brand**: Primary brand colors
- **success**: Success states and feedback
- **warning**: Warning states and alerts
- **error**: Error states and validation
- **info**: Information and links

### Token Processing Workflow

1. **Design in Figma**: Create your design tokens in Figma
2. **Export from Figma**: Use the [Tailwind Theme Gen](https://www.figma.com/community/plugin/1384511746402383895/tailwind-theme-gen) plugin to export theme variables
3. **Import to Package**: Place the exported variables in `input/main.css`
4. **Process**: Run `npm run process` to generate `theme/main.css` with semantic naming
5. The processed file contains semantic tokens with direct color values

#### Figma Integration

The [Tailwind Theme Gen](https://www.figma.com/community/plugin/1384511746402383895/tailwind-theme-gen) Figma plugin allows you to:

- Export design tokens directly from your Figma design system
- Generate CSS variables in the correct format
- Maintain consistency between design and code

Simply export your tokens from Figma and paste them into `input/main.css`, then run the processing workflow.

Example transformation:

```css
/* Input (from Figma export in input/main.css) */
--color-semantic-text-primary: rgba(17, 24, 39, 1);

/* Output (processed in theme/main.css) */
--text-color-neutral-primary: rgba(17, 24, 39, 1);
```

## Usage with Tailwind CSS v4

Tailwind CSS v4 reads CSS variables directly, so you just need to import the theme CSS file:

### 1. Import in your CSS

```css
/* globals.css or main.css */
@import '@madrasah/tokens/css';
@import 'tailwindcss';
```

### 2. Use in your components

```jsx
// Tokens are available as Tailwind utilities with semantic naming
<div className="bg-background-neutral-primary text-text-neutral-primary border border-border-neutral-primary">
  <h1 className="text-text-brand-primary">Hello World</h1>
  <p className="text-text-neutral-secondary">This uses semantic design tokens</p>
  <button className="bg-background-success-bold text-text-success-inverse">Success Button</button>
</div>
```

## Available Token Categories

### Background Colors

- `background-color-neutral-{primary|secondary|tertiary|disabled}`
- `background-color-neutralinverse-{primary|secondary|tertiary}`
- `background-color-brand-{primary|secondary|tertiary}`
- `background-color-success-{subtle|bold}`
- `background-color-warning-{subtle|bold}`
- `background-color-error-{subtle|bold}`
- `background-color-info-{subtle|bold}`
- `background-color-{white|black}`

### Text Colors

- `text-color-neutral-{primary|secondary|tertiary|disabled}`
- `text-color-neutralinverse-{primary|secondary|tertiary}`
- `text-color-brand-{primary|secondary|inverse}`
- `text-color-success-{primary|secondary|inverse}`
- `text-color-warning-{primary|secondary|inverse}`
- `text-color-error-{primary|secondary|inverse}`
- `text-color-info-{primary|secondary|inverse}`
- `text-color-{white|black}`

### Border Colors

- `border-color-neutral-{primary|secondary}`
- `border-color-neutralinverse-{primary|secondary}`
- `border-color-brand-{primary|inverse}`
- `border-color-success-{primary|inverse}`
- `border-color-warning-{primary|inverse}`
- `border-color-error-{primary|inverse}`
- `border-color-info-{primary|inverse}`

## JavaScript API

You can also import tokens as JavaScript objects:

```javascript
import tokens from '@madrasah/tokens';

// Access parsed token values
console.log(tokens['background-color-brand-primary']); // rgba(12, 74, 110, 1)
console.log(tokens['text-color-neutral-primary']); // rgba(17, 24, 39, 1)
```

## CSS Custom Properties

All tokens are available as CSS custom properties:

```css
.my-component {
  color: var(--text-color-brand-primary);
  background: var(--background-color-neutral-primary);
  border-color: var(--border-color-neutral-primary);
}
```

## Tailwind CSS Classes

With Tailwind v4, semantic tokens work seamlessly with utilities:

```css
/* These are automatically available in Tailwind */
.bg-background-neutral-primary {
  background-color: var(--background-color-neutral-primary);
}
.text-text-brand-primary {
  color: var(--text-color-brand-primary);
}
.border-border-success-primary {
  border-color: var(--border-color-success-primary);
}
```

## Development

```bash
npm run process  # Process input/main.css → theme/main.css
npm run build    # Validate package structure
```

### Workflow

1. **Edit Tokens**: Modify `input/main.css` with your design tokens
2. **Process**: Run `npm run process` to generate semantic tokens with proper namespacing
3. **Build**: Run `npm run build` to validate the package
4. **Use**: Import the processed tokens in your projects

### Example Token Structure

```css
/* input/main.css */
@theme {
  --color-semantic-text-neutral-primary: rgba(17, 24, 39, 1);
  --color-semantic-background-brand-primary: rgba(12, 74, 110, 1);
  --color-semantic-border-success-primary: rgba(4, 120, 87, 1);
}

/* theme/main.css (generated) */
@theme {
  --text-color-neutral-primary: rgba(17, 24, 39, 1);
  --background-color-brand-primary: rgba(12, 74, 110, 1);
  --border-color-success-primary: rgba(4, 120, 87, 1);
}
```

## License

ISC
