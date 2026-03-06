export declare class AuthController {
    login(loginDto: any): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
        };
    }>;
    register(registerDto: any): Promise<{
        message: string;
        user: {
            id: string;
            email: any;
        };
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.controller.d.ts.map