import { db } from "@/db/clients";
import { IIssuer, IIssuerFactory } from '../types';
import { issuers } from "@/db/schema";

export const IssuerFactory: IIssuerFactory = {
    async makeIssuer(overrides: Partial<IIssuer> = {}): Promise<IIssuer> {
        const defaultIssuer: Partial<IIssuer>  = {
            name: 'Default Issuer Name',
            url: 'https://default-issuer-url.com',
            createdAt: new Date(),
        };

        const issuer = ((await db.insert(issuers).values({ ...defaultIssuer, ...overrides }).returning()) as IIssuer[])[0];
        if (!issuer) {
            throw new Error("Failed to create issuer");
        }
        return issuer;
    },
};