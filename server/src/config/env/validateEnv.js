const REQUIRED_ENV_KEYS = ['MONGO_URI', 'JWT_SECRET'];

export const validateEnv = () => {
  const missing = REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
