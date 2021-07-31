const config = {
  envs: {
    PROD: 'production',
    DEV: 'development',
    TEST: 'test'
  },
  CORS_WHITELISTS: new RegExp(process.env.CORS_WHITELISTS),
  LOGS: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
};

export { config };
export * from './envs';
