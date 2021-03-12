declare namespace NodeJS {
  interface ProcessEnv {
    readonly PUBLIC_URL: string;
    readonly contentfulGraphQLUrl: string;
    readonly contentfulPreviewGraphQLUrl: string;
    readonly SENDINBLUE_API_KEY: string;
  }
}
