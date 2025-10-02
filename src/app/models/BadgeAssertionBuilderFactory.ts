import {
  BadgeAssertionBuilder as IBadgeAssertionBuilder,
  BadgeAssertionBuilderFactory as IBadgeAssertionBuilderFactory,
} from "../types";
import { v4 as uuidv4 } from "uuid";
import { NewBadgeAssertion } from "@/db/schema";

class BadgeAssertionBuilder implements IBadgeAssertionBuilder {
  private badgeId!: number;
  private recipientId!: number;
  private issuedOn!: Date | null;
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
      throw new Error("badgeId must be defined");
    }
    if (this.recipientId === undefined) {
      throw new Error("recipientId must be defined");
    }
  }

  build(): NewBadgeAssertion {
    this.validateRequiredFields();

    const badgeAssertion: NewBadgeAssertion = {
      uid: uuidv4(),
      badgeId: this.badgeId,
      recipientId: this.recipientId,
      issuedOn: new Date().toDateString(),
      image: this.image,
    };

    return badgeAssertion;
  }
}

export class BadgeAssertionBuilderFactory
  implements IBadgeAssertionBuilderFactory
{
  createBuilder(): IBadgeAssertionBuilder {
    return new BadgeAssertionBuilder();
  }
}
