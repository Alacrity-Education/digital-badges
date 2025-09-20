import { IRecipient } from "../types";


export class Recipient implements IRecipient {
    id: number;
    email: string;
    hashedEmail: string;
    createdAt: Date;

    constructor(data: IRecipient) {
        this.id = data.id;
        this.email = data.email;
        this.hashedEmail = data.hashedEmail;
        this.createdAt = data.createdAt;
    }
}