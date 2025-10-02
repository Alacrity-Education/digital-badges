import { db } from "@/db/clients";
import { IssuerFactory as IIssuerFactory } from "../types";
import { Issuer } from "@/db/schema";

export const IssuerFactory: IIssuerFactory = {
  makeIssuer(overrides: Partial<Issuer> = {}): Issuer {
    const defaultIssuer: Issuer = {
      id: 0,
      name: "Default Issuer Name",
      url: "https://default-issuer-url.com",
      createdAt: new Date(),
    };

    return { ...defaultIssuer, ...overrides };
  },
};
