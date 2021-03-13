declare namespace NodeJS {
  interface ProcessEnv {
    readonly PUBLIC_URL: string;
    readonly contentfulGraphQLUrl: string;
    readonly contentfulPreviewGraphQLUrl: string;
    readonly SENDINBLUE_API_KEY: string;
    readonly NEXT_PUBLIC_SANITY_DATASET: string;
    readonly NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  }
}
