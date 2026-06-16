# Webflow Code Components

A simplified guide to creating and syncing React components to Webflow.

## What is a Webflow Code Component?

A Webflow Code Component allows you to write custom React code, style it, and bundle it into a reusable element that can be dragged and dropped directly inside the Webflow Designer. This gives developers the full power of React—like managing state, fetching live APIs, and utilizing complex libraries—while still allowing marketing teams to easily edit text, images, and properties using Webflow's native UI.

## Step-by-Step Guide

### 0. Prerequisites

Before you begin, download the Boilerplate project folder from the [Google Drive link](https://drive.google.com/) and open it in your terminal. Then, install the dependencies and start the local preview server:

```bash
npm install
npm start
```

### 1. Authenticate with Webflow

Authenticate the Webflow CLI with your workspace. Run the following command in a new terminal:

```bash
npx webflow auth login
```

This will open a browser window for you to log into your Webflow account.

### 2. Define a CSS Variable

Before building components, define your design tokens (colors, spacing, typography). Open `src/styles/webflow-variables.css` and add your new variable inside the `:root` block.

```css
:root {
  /* ... existing variables ... */
  --wf-color--brand: #ff0055;
}
```

### 3. Display it on the Variables Page

To make the variable visible and copyable in your local preview, open `src/pages/WebflowVariablesPage.jsx` and add it to the corresponding array (e.g., the `colors` array).

```jsx
const colors = [
  // ... existing colors ...
  { name: '--wf-color--brand', value: '#ff0055' },
];
```

### 4. Create a Component Folder

Create a new folder for your component inside the `src/components/` directory. For example, create `src/components/Button/`.

### 5. Write the React Component

Write your React component logic in `Button.jsx`. This is where you define how the component renders based on the properties passed to it.

```jsx
import React from 'react';
import './Button.css';

export const Button = ({
  label = 'Click Me',
  variant = 'Primary',
  size = 'Medium',
}) => {
  const className = [
    'wf-button',
    \`wf-button--\${variant.toLowerCase()}\`,
    \`wf-button--\${size.toLowerCase()}\`,
  ].join(' ');

  return (
    <button className={className}>
      {label}
    </button>
  );
};
```

### 6. Style the Component

Add your styling in `Button.css`. These styles will be bundled and applied in Webflow.

```css
.wf-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s;
  border: 1px solid transparent;
}

.wf-button:hover {
  opacity: 0.9;
}

/* ─── Variants ─── */
.wf-button--primary {
  background-color: #3b82f6;
  color: white;
}
.wf-button--secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}
```

### 7. Add Properties for Webflow

To make your component editable in Webflow, define its properties in the `.webflow.jsx` file.

```tsx
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { Button } from './Button';

export default declareComponent(Button, {
  name: 'Button',
  description: 'A versatile button component.',
  group: 'Basic',
  props: {
    label: props.String({
      name: 'Label',
      defaultValue: 'Click Me',
    }),
  },
});
```

> **Crucial:** Make sure you also destructure these properties in your React component (e.g., `export const Button = ({ label }) => { ... }`) so they actually work!

### 8. Upload Component (Add to Webflow)

Once your component is ready, bundle and upload it to your Webflow Workspace:

```bash
npm run webflow:import
```

After the import succeeds:
1. Open your Webflow site.
2. Press **`L`** → find your library → click **Install** (if not installed yet).
3. Press **`⇧C`** → find your component.
4. Drag it onto the canvas and edit its properties in the right panel.

## Additional Steps: Helpful Scripts

Once you are comfortable adding components manually, you can use these helper scripts to speed up your workflow.

### Create a Component Automatically

Run the scaffolding script to automatically generate the folder and boilerplate files for a new component:

```bash
npm run create:component MyComponent
```

### Delete a Component

To completely remove a component from your project:

```bash
npm run delete:component MyComponent
```

This automatically deletes the component folder and removes references. Afterwards, re-run `npm run webflow:import` to update your Webflow Workspace and remove it from your library.

## Use Cases & Drawbacks

Before adopting React Code Components in Webflow, it is important to understand when they shine and when they might not be the best fit.

### Ideal Use Cases (Landing Pages)
- **Advanced Interactive Elements:** Custom 3D graphics (e.g., Three.js), highly complex custom sliders, or advanced animations that exceed native Webflow interaction limits.
- **Interactive Tools & Calculators:** ROI calculators, dynamic pricing toggles, or lead-gen quizzes embedded directly into the marketing page.
- **Dynamic Content Fetching:** Pulling in live data from external sources (e.g., live job boards, real estate listings, or social feeds) into a landing page.
- **Strictly Standardized Components:** Global UI elements that must remain absolutely identical across dozens of landing pages, where you only want marketing teams to tweak specific text props, not the layout.

### Drawbacks & Limitations
- **Slower for Standard UI:** Building standard landing page sections in React is significantly slower than building them visually directly in Webflow.
- **Client Handoff Friction:** Clients or marketing teams cannot use the Webflow Designer to drag-and-drop elements or change the layout *inside* the component; they can only edit the exposed text/image props.
- **No Dynamic Looping:** You cannot use looping to dynamically add or remove multiple elements (for example, individual slides in a slider) from Webflow.
