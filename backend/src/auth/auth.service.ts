import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async generateToken(user: any) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email,
            roles: user.roles || [],
        });
    }

    async validateToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            return null;
        }
    }

    async validateUser(email: string, password: string) {
        // Mock user validation
        if (email && password) {
            return {
                id: 'user-123',
                email,
                roles: ['user'],
            };
        }
        return null;
    }
}
