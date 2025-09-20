import { db } from '@/db/clients';
import { IBadgeAssertion, IBadgeAssertionBuilder, IBadgeAssertionBuilderFactory } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { badgeAssertions } from '@/db/schema';

let nextId = 1;

class BadgeAssertionBuilder implements IBadgeAssertionBuilder {
  private badgeId!: number;
  private recipientId!: number;
  private issuedOn!: Date;
  private image: string | null = null;

  setBadgeId(badgeId: number): IBadgeAssertionBuilder {
    this.badgeId = badgeId;
    return this;
  }

  setRecipientId(recipientId: number): IBadgeAssertionBuilder {
    this.recipientId = recipientId;
    return this;
  }

  setIssuedOn(issuedOn: Date): IBadgeAssertionBuilder {
    this.issuedOn = issuedOn;
    return this;
  }

  setImage(image: string | null): IBadgeAssertionBuilder {
    this.image = image;
    return this;
  }

  private validateRequiredFields(): void {
    if (this.badgeId === undefined) {
    throw new Error('badgeId must be defined');
    }
    if (this.recipientId === undefined) {
    throw new Error('recipientId must be defined');
    }
    if (this.issuedOn === undefined) {
    throw new Error('issuedOn must be defined');
    }
  }

  async build(): Promise<IBadgeAssertion> {

    this.validateRequiredFields();

    const badgeAssertion = (await db.insert(badgeAssertions).values({
      uuid: uuidv4(),
      badgeId: this.badgeId,
      recipientId: this.recipientId,
      issuedOn: this.issuedOn,
      image: this.image,
    }).returning() as IBadgeAssertion[])[0];

    if (!badgeAssertion) {
      throw new Error('Failed to create badge assertion');
    }

    return badgeAssertion;
  }
}

export class BadgeAssertionBuilderFactory implements IBadgeAssertionBuilderFactory {
  createBuilder(): IBadgeAssertionBuilder {
    return new BadgeAssertionBuilder();
  }
}
