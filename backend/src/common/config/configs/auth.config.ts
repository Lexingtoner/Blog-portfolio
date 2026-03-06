import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtName: process.env.JWT_NAME || 'auth' || 'authorization',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtTtl: process.env.JWT_TTL || '24h',
}));
