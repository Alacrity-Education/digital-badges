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

        const recipient = ((await db.insert(recipients).values({ ...defaultRecipient, ...overrides }).returning())as Recipient[])[0];
        if(!recipient){
            throw new Error("Failed to create recipient");
        }
        return recipient;
        
     
    }
}