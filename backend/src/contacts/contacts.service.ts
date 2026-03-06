import { Injectable } from '@nestjs/common';

export interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}
@Injectable()
export class ContactsService {
    private contacts: Contact[] = [];

    createContact(contactDto: any): Contact {
        const contact: Contact = {
            id: Date.now().toString(),
            name: contactDto.name,
            email: contactDto.email,
            message: contactDto.message,
            createdAt: new Date(),
        };
        this.contacts.push(contact);
        console.log('New contact submitted:', contact);
        return contact;
    }

    findAll(): Contact[] {
        return this.contacts;
    }

    findOne(id: string): Contact | undefined {
        return this.contacts.find((c) => c.id === id);
    }
}
