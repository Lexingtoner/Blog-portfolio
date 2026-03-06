import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: any): Promise<string>;
    validateToken(token: string): Promise<any>;
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        roles: string[];
    } | null>;
}
//# sourceMappingURL=auth.service.d.ts.map