declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
      SUPABASE_API_KEY: string;
      SECRET_JWT: string;
      SECRET_SIGNUP: string;
    }
  }
}

export {};
