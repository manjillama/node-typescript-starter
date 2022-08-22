export const keys = {
  CORS_WHITELISTS: new RegExp(process.env.CORS_WHITELISTS),
  LOGS: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  MONGO_URI: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI
};
