import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    @Post('login')
    @HttpCode(200)
    
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    async login(@Body() loginDto: any) {
        return {
            message: 'Login successful',
            token: 'mock-token-here',
            user: {
                id: 'user-123',
                email: 'user@example.com',
            },
        };
    }

    @Post('register')
    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    async register(@Body() registerDto: any) {
        return {
            message: 'User registered successfully',
            user: {
                id: 'new-user-123',
                email: registerDto.email,
            },
        };
    }

    @Post('logout')
    @HttpCode(200)
    @ApiOperation({ summary: 'User logout' })
    @ApiResponse({ status: 200, description: 'Logout successful' })
    async logout() {
        return { message: 'Logout successful' };
    }
}
