import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class RootController {
    @Get()
    root(@Res() res: Response) {
        // Redirect to Swagger docs
        return res.redirect('/api/docs');
    }
}