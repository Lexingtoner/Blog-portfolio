import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactsService } from './contacts.service';
@ApiTags('contacts')
@Controller('api/contacts')
export class ContactsController {
    constructor(private contactsService: ContactsService) { }

    @Post('submit')
    @HttpCode(201)
    @ApiOperation({ summary: 'Submit contact form' })
    @ApiResponse({ status: 201, description: 'Message sent successfully' })
    async submitContact(@Body() contactDto: any) {
        return this.contactsService.createContact(contactDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all contact submissions' })
    @ApiResponse({ status: 200, description: 'List of all contacts' })
    async getContacts() {
        return this.contactsService.findAll();
    }
}
