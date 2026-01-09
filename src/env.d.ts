interface ImportMetaEnv {
  readonly GMAIL_PASSWORD: string;
  readonly GMAIL_USER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
