"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
let ContactsService = class ContactsService {
    constructor() {
        this.contacts = [];
    }
    createContact(contactDto) {
        const contact = {
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
    findAll() {
        return this.contacts;
    }
    findOne(id) {
        return this.contacts.find((c) => c.id === id);
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)()
], ContactsService);
//# sourceMappingURL=contacts.service.js.map