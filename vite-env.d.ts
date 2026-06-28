/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL?: string;
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_AI_PROVIDER?: string;
  readonly VITE_OLLAMA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
