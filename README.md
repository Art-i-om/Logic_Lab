# Logic Lab 🧠⚡

**A Visual Logic Circuit Simulator with Real-Time Evaluation**

Interactive drag-and-drop logic gate builder with instant computation and beautiful visualizations.

## ✨ Features

- 🎨 **Visual Circuit Builder** - Drag & drop gates onto canvas
- 🔌 **Connection System** - Click ports to create connections with visual feedback
- 🧮 **Real-Time Logic Evaluation** - Instant computation as you build
- 🎯 **Interactive START Gates** - Double-click to toggle TRUE/FALSE
- 📊 **Visual Indicators** - Color-coded states (green=TRUE, red/gray=FALSE)
- ⚡ **7 Logic Gates** - AND, OR, NOT, NAND, NOR, XOR, XNOR
- 🎬 **Smooth Animations** - Professional UI/UX with hover effects
- 📱 **Responsive Design** - Works on various screen sizes

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📖 How to Use

1. **Add Gates**: Drag START, logic gates (AND, OR, etc.), and END from sidebar
2. **Toggle START**: Double-click START gates to toggle between TRUE (🟢1) and FALSE (🔴0)
3. **Create Connections**: Click output port (🟠) → click input port (🔵)
4. **See Results**: END gates display the final computed value
5. **Move Gates**: Drag gates around - connections follow automatically!

## 🧪 Example Circuit

```
START (🟢1) ──┐
              ├──> AND ──> END (🟢1)
START (🟢1) ──┘

Result: 1 AND 1 = 1
```

## 🛠️ Tech Stack

- **React** + TypeScript
- **Vite** - Fast build tool
- **React DnD** - Drag and drop functionality
- **SVG** - Connection line rendering
- **CSS3** - Animations and styling

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
