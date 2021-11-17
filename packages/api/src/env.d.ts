declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    FRONTEND_URL: string;
    DATABASE_URL: string;
    GOOGLE_BOOKS_API_KEY: string;
  }
}