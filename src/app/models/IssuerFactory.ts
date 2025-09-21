import { db } from "@/db/clients";
import { IIssuer, IIssuerFactory } from '../types';
import { issuers } from "@/db/schema";
import { Issuer } from "./Issuer";

export const IssuerFactory: IIssuerFactory = {
    makeIssuer(overrides: Partial<IIssuer> = {}): IIssuer {
        const defaultIssuer: IIssuer  = {
            id: 0,
            name: 'Default Issuer Name',
            url: 'https://default-issuer-url.com',
            createdAt: new Date(),
        };

        return new Issuer({ ...defaultIssuer, ...overrides });
    },
};