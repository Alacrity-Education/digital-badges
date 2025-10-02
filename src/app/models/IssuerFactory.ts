import { IssuerFactory as IIssuerFactory } from "../types";
import { Issuer } from "@/db/schema";

export const IssuerFactory: IIssuerFactory = {
  makeIssuer(overrides: Partial<Issuer> = {}): Issuer {
    const defaultIssuer: Issuer = {
      engineUrl: "http://localhost:3000",
      id: 0,
      name: "Default Issuer Name",
      url: "http://localhost:3000",
      createdAt: new Date(),
    };

    return { ...defaultIssuer, ...overrides };
  },
};
