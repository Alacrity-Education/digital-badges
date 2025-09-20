import { IBadgeAssertion } from "../types";


export class BadgeAssertion implements IBadgeAssertion {
    id: number;
    uuid: string;
    badgeId: number;
    recipientId: number;
    issuedOn: Date;
    image: string | null;

    constructor(data: IBadgeAssertion) {
        this.id = data.id;
        this.uuid = data.uuid;
        this.badgeId = data.badgeId;
        this.recipientId = data.recipientId;
        this.issuedOn = data.issuedOn;
        this.image = data.image;
    }
}