export interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}
export declare class ContactsService {
    private contacts;
    createContact(contactDto: any): Contact;
    findAll(): Contact[];
    findOne(id: string): Contact | undefined;
}
//# sourceMappingURL=contacts.service.d.ts.map