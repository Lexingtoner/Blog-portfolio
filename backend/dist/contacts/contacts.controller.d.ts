import { ContactsService } from './contacts.service';
export declare class ContactsController {
    private contactsService;
    constructor(contactsService: ContactsService);
    submitContact(contactDto: any): Promise<import("./contacts.service").Contact>;
    getContacts(): Promise<import("./contacts.service").Contact[]>;
}
//# sourceMappingURL=contacts.controller.d.ts.map