# Webflow Code Components

A simplified guide to creating and syncing React components to Webflow.

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
- **SEO Concerns:** Because React components render client-side, text inside them might not be immediately indexed by search engines, which is critical for landing page SEO.
- **Maintenance Overhead:** Updating the component requires a developer to edit code, rebuild, and re-import, preventing designers from making quick layout tweaks themselves.

## Step-by-Step Guide

### 0. Prerequisites

Before you begin, clone the repository, install the dependencies, and start the local preview server:

```bash
git clone https://github.com/nileshUplers/webflow-code-components.git
cd webflow-code-components
npm install && npm start
```

### 1. Authenticate with Webflow

Authenticate the Webflow CLI with your workspace. Run the following command in a new terminal:

```bash
npx webflow auth login
```

This will open a browser window for you to log into your Webflow account.

### 2. Create a Code Component

Run the scaffolding script to automatically generate your component files:

```bash
npm run create:component MyComponent
```

This creates a folder at `src/components/MyComponent/`.

### 3. Develop & Preview Locally

Write your React code in `MyComponent.jsx` and style it in `MyComponent.css`.

To preview your work locally:
1. Open `src/pages/ComponentsDisplayPage.jsx`
2. Import your component and add it to the `components` array:

```jsx
// 1. Import at the top
import { MyComponent } from '../components';

// 2. Add to the components array
const components = [
  {
    name: 'MyComponent',
    group: 'Custom',
    description: 'My custom component.',
    propsDocs: [],
    playgroundProps: [
      { name: 'title', label: 'Title', type: 'string', default: 'Hello World' }
    ],
    render: p => <MyComponent title={String(p.title)} />
  }
];
```

3. Check your browser at `http://localhost:3000` to see it live!

### 4. Add Properties for Webflow

To make your component editable in Webflow, define its properties in the `.webflow.jsx` file.

```tsx
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyComponent } from './MyComponent';

export default declareComponent(MyComponent, {
  name: 'My Component',
  description: 'A custom Webflow component.',
  group: 'Custom',
  props: {
    title: props.String({
      name: 'Title',
      defaultValue: 'Hello World',
    }),
  },
});
```

> **Crucial:** Make sure you also destructure these properties in your React component (e.g., `export const MyComponent = ({ title }) => { ... }`) so they actually work!

### 5. Upload Component (Add to Webflow)

Once your component is ready, bundle and upload it to your Webflow Workspace:

```bash
npm run webflow:import
```

After the import succeeds:
1. Open your Webflow site.
2. Press **`L`** → find your library → click **Install** (if not installed yet).
3. Press **`⇧C`** → find your component.
4. Drag it onto the canvas and edit its properties in the right panel.

### 6. Delete a Component

To remove a component from your project, run the deletion script:

```bash
npm run delete:component MyComponent
```

This automatically deletes the component folder and removes references from the code. Afterwards, re-run `npm run webflow:import` to update your Webflow Workspace and remove the deleted component from your library.
