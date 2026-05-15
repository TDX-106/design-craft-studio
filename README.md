# Design Craft Studio

A premium, interactive design studio reference platform for materials, color, lighting, space planning, and interior styles.

## 🛠️ Tech Stack Explained

This project is built using a modern, high-performance web development stack. Here is a simple breakdown of the technologies powering the app:

### 1. The Core Application
*   **React 19**: The core library used to build the user interface components.
*   **TanStack Start**: A full-stack React framework. Unlike older React apps that run entirely in the user's browser (Single Page Applications), TanStack Start provides **Server-Side Rendering (SSR)**. This means the server builds the HTML page before sending it to the user, making the website faster and better for SEO.
*   **TanStack Router**: Handles navigation between different pages (`/colors`, `/materials`, etc.) smoothly without reloading the entire website.
*   **TypeScript**: Adds strict typing to JavaScript, preventing bugs and making the code easier to maintain.

### 2. Styling & Design
*   **Tailwind CSS v4**: A utility-first CSS framework that allows us to style the application rapidly using classes directly in our HTML/JSX.
*   **shadcn/ui**: A collection of beautiful, highly customizable UI components (like buttons, dialogs, and forms) built on top of Radix UI to ensure everything is accessible (works well with screen readers and keyboards).
*   **Framer Motion**: The animation library responsible for the smooth page transitions, fade-ins, and interactive hover effects across the site.

### 3. Build Tools & Environment
*   **Vite**: The build tool that bundles all our code together incredibly fast.
*   **Bun**: The package manager and runtime we use (instead of npm or Node.js) because it is significantly faster.
*   **Lovable Configuration (`@lovable.dev/vite-tanstack-config`)**: A custom setup that perfectly stitches Vite, TanStack Start, and our deployment target together so they work seamlessly.

---

## 🌍 Where & How It Is Deployed

**This application is specifically configured to be hosted on Cloudflare (Cloudflare Pages / Workers).** 

### Why Cloudflare?
Because this app uses **Server-Side Rendering (SSR)**, it is not a standard "Static Site" (a folder of plain HTML files). The app needs a server environment to dynamically generate pages. Our `vite.config.ts` uses a Cloudflare plugin that compiles the server into a lightweight "Worker" script that runs perfectly on Cloudflare's global edge network.

### ❌ Why deployments on Render or Vercel failed:
If you try to deploy this as a "Static Site" on Render or Vercel, the build will fail or show a blank page/404 error. This is because **there is no `index.html` file generated in the final build**. Vercel and Render static sites expect an `index.html`, but our app relies on the Cloudflare Worker server to generate the HTML dynamically. 

### ✅ How to Deploy Successfully to Cloudflare

The absolute easiest way to deploy this app is through the Cloudflare Dashboard. No code changes are required!

1. Create a free account on [Cloudflare](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** in the left sidebar.
3. Click **Create application** -> select the **Pages** tab -> click **Connect to Git**.
4. Connect your GitHub account and select the `design-craft-studio` repository.
5. In the Build Settings, enter the following:
   *   **Framework preset**: None
   *   **Build command**: `bun run build`
   *   **Build output directory**: `dist`
6. Click **Save and Deploy**. 

Cloudflare will automatically build the app and assign you a live URL. Furthermore, every time you push new code to your GitHub `main` branch, Cloudflare will automatically update your live website!

---

## 🚀 How to Run Locally

If you want to run the code on your own computer:

1. **Install Bun**: Make sure you have [Bun](https://bun.sh/) installed.
2. **Install Dependencies**: Open your terminal in the project folder and run:
   ```bash
   bun install
   ```
3. **Start the Server**: Run the development command:
   ```bash
   bun run dev
   ```
4. **View the App**: Open your web browser and go to `http://localhost:5173`.
