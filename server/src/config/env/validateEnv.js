const REQUIRED_ENV_KEYS = ['MONGO_URI', 'JWT_SECRET'];

export const validateEnv = () => {
  const missing = REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);

  if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL) {
    missing.push('CLIENT_URL');
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
