declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    FRONTEND_URL: string;
    DATABASE_URL: string;
  }
}