const config = {
  ENVS: {
    PROD: 'production',
    DEV: 'development',
    STAGE: 'staging',
    TEST: 'test'
  },
  defaultTimeZone: 'Asia/Kathmandu',
  maxSizeUpload: 1024 * 1024 // bytes
};

export { config };
export * from './keys';
