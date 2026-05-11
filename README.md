# Webflow Code Components — Starter Boilerplate

A starter boilerplate for building and importing custom React code components into the Webflow Designer using **DevLink**.

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

---

### 2. Set Up Environment Variables

Create a `.env` file based on `.env.example`:

```bash
WEBFLOW_API_TOKEN="your_token_here"
```

> If no token is found, the CLI will prompt you to authenticate via browser when you run the import command.

---

### 3. Preview Components Locally

```bash
npm start
```

Opens a local React preview at `http://localhost:3000` so you can build and inspect components before pushing to Webflow.

---

### 4. Import Your Library to Webflow

Once your components are ready, bundle and upload them to your Webflow Workspace:

```bash
npm run webflow:import
```

The CLI will authenticate, bundle all `*.webflow.tsx` files, and upload the library.

---

### 5. Install & Use in the Webflow Designer

1. Open any site in your Webflow Workspace.
2. Press **`L`** to open the **Libraries panel** → find your library → click **Install**.
3. Press **`⇧C`** to open the **Components panel**.
4. Drag your component onto the canvas.
5. Edit its props in the **Properties panel** on the right.

---

## Adding a New Component

Each component lives in its own folder under `src/components/`:

```
src/components/MyComponent/
├── MyComponent.tsx           # React component
├── MyComponent.css           # Component styles
├── MyComponent.webflow.tsx   # Webflow property registration
└── index.ts                  # Re-export
```

See the [Define a code component](https://developers.webflow.com/code-components/define-code-component) and [Prop Types](https://developers.webflow.com/code-components/reference/prop-types) docs for how to write the `.webflow.tsx` definition file.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start local React preview server |
| `npm run build` | Build production bundle |
| `npm run webflow:import` | Bundle & upload library to Webflow |

---

## Further Reading

- [Quick Start — Importing Code Components](https://developers.webflow.com/code-components/importing/quick-start)
- [Define a Code Component](https://developers.webflow.com/code-components/define-code-component)
- [Prop Types Reference](https://developers.webflow.com/code-components/reference/prop-types)
- [Webflow CLI Reference](https://developers.webflow.com/code-components/reference/cli)
