export type Issuer = {
  id: number;
  name: string;
  url: string;
  createdAt: Date;
};

export type Badge = {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
};

export type BadgeAssertion = {
  id: number;
  uuid: string;
  badgeId: number;
  recipientId: number;
  issuedOn: Date;
  image: string | null;
};
