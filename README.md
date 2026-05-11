# Webflow Code Components — Starter Boilerplate

A ready-to-use framework for building and importing custom React code components into the Webflow Designer. Example components and design variables are already included to help you get started quickly.

---

## Before You Start

Make sure you have:

- A **Webflow account** with either:
  - A Workspace on a **Freelancer, Core, Growth, Agency, or Enterprise** plan, or
  - A Webflow site on a **CMS, Business, or Enterprise** plan
- **Node.js 20+** and **npm 10+** installed

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/nileshUplers/webflow-code-components.git
cd webflow-code-components
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file based on `.env.example`:

```
WEBFLOW_API_TOKEN="your_token_here"
```

> If no token is found, the CLI will open a browser for Workspace authorization when you run the import command.

### 3. Preview Locally

```bash
npm start
```

Opens `http://localhost:3000` with three built-in views:
- **Components** — live preview of all components in the library
- **Variables** — visual reference for all design tokens
- **Guide** — this team's step-by-step workflow (also lives in the app)

---

## Project Structure

```
src/
├── components/                    # All Webflow components live here
│   └── FAQ/
│       ├── FAQ.tsx                # React component (HTML/CSS/JS logic)
│       ├── FAQ.css                # Component styles
│       ├── FAQ.webflow.tsx        # Webflow property registration
│       └── index.ts               # Re-export (don't touch)
│
├── pages/
│   ├── ComponentsDisplayPage.tsx  # Register new components here to preview
│   ├── WebflowVariablesPage.tsx   # Auto-displays CSS variables
│   └── DocumentationPage.tsx      # In-app team guide
│
├── styles/
│   └── webflow-variables.css      # Global design tokens (CSS variables)
│
└── App.tsx                        # Routing — only edit if adding a new page
```

---

## How to Add a New Component

> Think of it as writing a normal HTML/CSS component — the React part is minimal.

### Step 1 — Create the component folder

Inside `src/components/`, create a new folder named after your component:

```
src/components/MyCard/
```

---

### Step 2 — Write the React component (`MyCard.tsx`)

This is your HTML + CSS-in-class structure. If you know JSX (HTML with `className` instead of `class`), you're good:

```tsx
import React from 'react';
import './MyCard.css';

interface MyCardProps {
  title?: string;
  description?: string;
}

export const MyCard = ({ title = 'Hello', description = 'World' }: MyCardProps) => {
  return (
    <div className="my-card">
      <h2 className="my-card__title">{title}</h2>
      <p className="my-card__description">{description}</p>
    </div>
  );
};
```

**Key things:**
- Use `className` instead of `class`
- Props with `?` are optional and can have a default value after `=`
- Keep logic minimal — this is mostly markup

---

### Step 3 — Write the styles (`MyCard.css`)

Plain CSS — use the global variables from `src/styles/webflow-variables.css`:

```css
.my-card {
  padding: var(--wf-spacing--lg);
  border-radius: var(--wf-border-radius--base);
  background-color: var(--wf-color--white);
  box-shadow: var(--wf-shadow--md);
}

.my-card__title {
  font-size: var(--wf-font-size--2xl);
  font-weight: var(--wf-font-weight--bold);
  color: var(--wf-color--primary);
}

.my-card__description {
  font-size: var(--wf-font-size--base);
  color: var(--wf-color--gray-dark);
}
```

---

### Step 4 — Register it for Webflow (`MyCard.webflow.tsx`)

This tells Webflow what props designers can edit in the Designer panel:

```tsx
import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { MyCard } from './MyCard';

export default declareComponent(MyCard, {
  name: 'My Card',
  description: 'A simple card component.',
  group: 'Cards',
  props: {
    title: props.String({
      name: 'Title',
      defaultValue: 'Hello',
    }),
    description: props.String({
      name: 'Description',
      defaultValue: 'World',
    }),
  },
});
```

**Available prop types:**

| Prop Type | Use for |
|---|---|
| `props.String()` | Any text field |
| `props.Text()` | Long-form text / paragraph |
| `props.Boolean()` | On/Off toggles |
| `props.Number()` | Numeric values |
| `props.Variant()` | Dropdown with fixed options |
| `props.Color()` | Color picker |
| `props.Image()` | Image upload |
| `props.Link()` | URL / link field |

See [full prop types reference →](https://developers.webflow.com/code-components/reference/prop-types)

---

### Step 5 — Create the index export (`index.ts`)

Just one line — this lets other files import cleanly:

```ts
export * from './MyCard';
```

---

### Step 6 — Add it to the preview page

Open `src/pages/ComponentsDisplayPage.tsx` and add your component in two places:

**At the top — import it:**
```tsx
import { MyCard } from '../components/MyCard';
```

**Inside the `components` array — add a preview entry:**
```tsx
{
  name: 'My Card',
  description: 'A simple card with title and description.',
  render: <MyCard />
},
```

Now run `npm start` and check the **Components** page to see it live.

---

## How to Add a New CSS Variable

Open `src/styles/webflow-variables.css` and add your variable inside the `:root {}` block, following the existing naming pattern:

```css
:root {
  /* Your new variable */
  --wf-color--accent: #ff6b6b;
  --wf-spacing--section: 5rem;
}
```

**Naming convention:** `--wf-[category]--[name]`

| Category | Examples |
|---|---|
| `color` | `--wf-color--primary`, `--wf-color--accent` |
| `spacing` | `--wf-spacing--sm`, `--wf-spacing--xl` |
| `font-size` | `--wf-font-size--lg`, `--wf-font-size--3xl` |
| `font-weight` | `--wf-font-weight--bold` |
| `border-radius` | `--wf-border-radius--base` |
| `shadow` | `--wf-shadow--md` |

> After adding, check the **Variables** page in the local preview (`/variables`) — it auto-displays all `--wf-` variables.

---

## How to Upload to Webflow

Once your component is ready:

```bash
npm run webflow:import
```

The CLI will:
1. Check your `.env` for the API token (or open a browser to authenticate)
2. Bundle all `*.webflow.tsx` files
3. Upload the library to your Webflow Workspace

---

## Using Components in the Webflow Designer

1. Open your Webflow site.
2. Press **`L`** → find your library → click **Install**.
3. Press **`⇧C`** → find your component under its group.
4. Drag it onto the canvas.
5. Edit props in the **Properties panel** on the right.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start local preview server |
| `npm run webflow:import` | Bundle & upload library to Webflow |
| `npm run build` | Build production bundle |

---

## Further Reading

- [Define a Code Component](https://developers.webflow.com/code-components/define-code-component)
- [Prop Types Reference](https://developers.webflow.com/code-components/reference/prop-types)
- [Webflow CLI Reference](https://developers.webflow.com/code-components/reference/cli)
- [Bundling & Import](https://developers.webflow.com/code-components/bundling-and-import)
