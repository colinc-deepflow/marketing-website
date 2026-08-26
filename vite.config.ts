import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    // ── The `define` block that used to live here has been removed ────────────
    // It did this:
    //     'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    // which text-substitutes the key into the bundle at build time. That bundle
    // is downloaded by every visitor, so the key was published to the public
    // internet — readable with View Source and spendable by anyone who looked.
    //
    // There is no way to keep a secret in a front-end build. Anything the
    // browser can use, the browser's owner can read. The Gemini call therefore
    // runs on the server (server/index.js) and the client asks it via
    // /api/ai/workflow-preview.
    //
    // Only VITE_-prefixed variables are exposed to client code, and Vite handles
    // those itself — no `define` needed. Keep it that way: a variable without
    // the prefix is one that was never meant to reach a browser.

    return {
      server: {
        port: 3002,
        host: '0.0.0.0',
        strictPort: true,
        // Local dev only: forwards the AI call to a server run alongside
        // (`node server/index.js`), so dev behaves like production.
        proxy: {
          '/api/ai': {
            target: env.DEV_API_TARGET || 'http://localhost:8080',
            changeOrigin: true,
          },
        },
      },
      preview: {
        port: 3002,
        host: '0.0.0.0',
      },
      plugins: [react()],
      build: {
        outDir: 'dist',
        sourcemap: false,        // do not ship source maps to production
        chunkSizeWarningLimit: 1200,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
