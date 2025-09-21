import { db } from "@/db/clients";
import { IRecipient, IRecipientFactory } from "../types";
import { Recipient } from "./Recipient";
import { recipients } from "@/db/schema";


export class RecipientFactory implements IRecipientFactory {
    async makeRecipient(overrides?: Partial<IRecipient>): Promise<IRecipient> {
        const defaultRecipient: IRecipient = {
            id: 0,
            email: "",
            hashedEmail: "",
            createdAt: new Date(),
        };

        return new Recipient({ ...defaultRecipient, ...overrides });
    }
}