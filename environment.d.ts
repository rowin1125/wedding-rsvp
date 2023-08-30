declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_PROJECT_ID: string;
      NEXT_PUBLIC_SANITY_DATASET: string;
      NEXT_PUBLIC_SANITY_GRAPHQL_TAG: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_APP_URL: string;
    }
  }
}

export {};
