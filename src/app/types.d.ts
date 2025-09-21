export interface IIssuer  {
  id: number;
  name: string;
  url: string;
  createdAt: Date;
}

export interface IIssuerFactory {
  makeIssuer: (overrides?: Partial<IIssuer>) => IIssuer;
}

export interface IBadge {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
};

export interface IBadgeAssertion {
  id: number;
  uuid: string;
  badgeId: number;
  recipientId: number;
  issuedOn: Date;
  image: string | null;
};

export interface IRecipient {
  id: number;
  email: string;
  hashedEmail: string;
  createdAt: Date;
}

export interface IBadgeFactory {
  makeBadge: (overrides?: Partial<IBadge>) => Promise<IBadge>;
}

export interface IBadgeAssertionBuilder {
  setBadgeId(badgeId: number): IBadgeAssertionBuilder;
  setRecipientId(recipientId: number): IBadgeAssertionBuilder;
  setIssuedOn(issuedOn: Date): IBadgeAssertionBuilder;
  setImage(image: string | null): IBadgeAssertionBuilder;
  build(): IBadgeAssertion;
}

export interface IBadgeAssertionBuilderFactory {
  createBuilder(): IBadgeAssertionBuilder;
}

export interface IRecipientFactory {
  makeRecipient: (overrides?: Partial<IRecipient>) => Promise<IRecipient>;
}
