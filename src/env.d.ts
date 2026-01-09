interface ImportMetaEnv {
  readonly GMAIL_PASSWORD: string;
  readonly GMAIL_USER: string;
  readonly PUBLIC_GOOGLE_MAPS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
