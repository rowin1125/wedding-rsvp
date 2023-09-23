declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SENDINBLUE_API_KEY: string;
            SENDINBLUE_SMTP_KEYS: string;
            REDWOOD_ENV_VERCEL_URL: string;
        }
    }
}

export {};
