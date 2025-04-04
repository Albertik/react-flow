![](https://github.com/xyflow/web/blob/main/assets/codesandbox-header-ts.png?raw=true)

# React Flow Execution Visualization

This project visualizes execution flow data using React Flow.

## Features

- Visualizes execution flow from data.json
- Shows execution nodes with status and data type information
- Visualizes data flow between executions
- Responsive layout that works on various screen sizes

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm or npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/username/react-flow.git
cd react-flow
```

2. Install dependencies
```bash
pnpm install
# or
npm install
```

3. Start the development server
```bash
pnpm dev
# or
npm run dev
```

4. Open your browser at http://localhost:5173

## Deployment

### GitHub Pages

To deploy this project to GitHub Pages:

1. Update `package.json` with your GitHub username:
```json
"homepage": "https://your-username.github.io/react-flow"
```

2. Update `vite.config.ts` with the correct base path:
```ts
base: '/react-flow/' // Should match your repository name
```

3. Deploy the application:
```bash
pnpm deploy
# or
npm run deploy
```

4. Your application will be available at: https://your-username.github.io/react-flow

### Other Deployment Options

#### Netlify

1. Create a `netlify.toml` file in the root of your project:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Deploy using the Netlify CLI or connect your GitHub repository to Netlify.

#### Vercel

Simply connect your GitHub repository to Vercel, which will automatically detect your Vite project settings.

## Project Structure

- `src/` - Source code
  - `nodes/` - React Flow node components
  - `edges/` - React Flow edge components
  - `utils/` - Utility functions
- `public/` - Static assets including data.json and schema.json

## License

MIT

## Resources

Links:

- [React Flow - Docs](https://reactflow.dev)
- [React Flow - Discord](https://discord.com/invite/Bqt6xrs)

Learn:

- [React Flow – Custom Nodes](https://reactflow.dev/learn/customization/custom-nodes)
- [React Flow – Layouting](https://reactflow.dev/learn/layouting/layouting)
