const DeploymentInstructions = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      <h1>Fix GitHub Pages Deployment</h1>

      <p>
        The 404 Error is happening because GitHub Pages is having trouble
        finding your data files. Here's how to fix it:
      </p>

      <h2>Option 1: Correct GitHub Pages Setup</h2>
      <ol>
        <li>
          <strong>
            Make sure your package.json has the correct homepage URL:
          </strong>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {`"homepage": "https://YOUR_GITHUB_USERNAME.github.io/react-flow",`}
          </pre>
          <p>Replace YOUR_GITHUB_USERNAME with your actual GitHub username.</p>
        </li>
        <li>
          <strong>Make sure vite.config.ts has the correct base path:</strong>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {`base: "/react-flow/",`}
          </pre>
          <p>This should match your repository name.</p>
        </li>
        <li>
          <strong>
            Verify that your data.json file is in the public folder and being
            copied to the build:
          </strong>
          <p>
            Check your dist folder after running the build command to ensure
            data.json is there.
          </p>
        </li>
        <li>
          <strong>Redeploy to GitHub Pages:</strong>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {`pnpm run deploy`}
          </pre>
        </li>
      </ol>

      <h2>Option 2: Alternative Deployment Services</h2>
      <p>You may find it easier to deploy to Netlify or Vercel:</p>

      <h3>Netlify Deployment:</h3>
      <ol>
        <li>
          Create a free account at{" "}
          <a
            href="https://netlify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
        </li>
        <li>
          Install Netlify CLI: <code>npm install -g netlify-cli</code>
        </li>
        <li>
          Login to Netlify: <code>netlify login</code>
        </li>
        <li>
          Run the build:
          <pre
            style={{
              background: "#f6f8fa",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {`pnpm run build`}
          </pre>
        </li>
        <li>
          Deploy with Netlify:
          <pre
            style={{
              background: "#f6f8fa",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {`netlify deploy --prod --dir=dist`}
          </pre>
        </li>
      </ol>

      <h3>Vercel Deployment:</h3>
      <ol>
        <li>
          Create a free account at{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
        </li>
        <li>
          Install Vercel CLI: <code>npm install -g vercel</code>
        </li>
        <li>
          Login to Vercel: <code>vercel login</code>
        </li>
        <li>
          Deploy with Vercel:
          <pre
            style={{
              background: "#f6f8fa",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {`vercel`}
          </pre>
        </li>
      </ol>

      <h2>Technical Details About The Error</h2>
      <p>The error is happening because:</p>
      <ol>
        <li>GitHub Pages deploys to a subdirectory (e.g., /react-flow/)</li>
        <li>
          The app is trying to load data from a path like /react-flow/data.json
        </li>
        <li>
          Either the file isn't being included in the build, or the path is
          incorrect
        </li>
      </ol>

      <p>
        Check the browser console for more details on the exact fetch URL that's
        failing.
      </p>
    </div>
  );
};

export default DeploymentInstructions;
