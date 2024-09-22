import { configDotenv } from 'dotenv';

configDotenv({ path: '.env' });

export const AuthConstants = {
  secret: process.env.JWT_CONSTANT,
};
