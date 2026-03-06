"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('auth', () => ({
    jwtName: process.env.JWT_NAME || 'auth' || 'authorization',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtTtl: process.env.JWT_TTL || '24h',
}));
//# sourceMappingURL=auth.config.js.map