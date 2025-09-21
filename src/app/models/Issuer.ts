import { IIssuer } from "../types";
import { BadgeFactory } from "./BadgeFactory";


export class Issuer implements IIssuer  {
    id: number;
    name: string;
    createdAt: Date;
    url: string;

    constructor(data: IIssuer) {
        this.id = data.id;
        this.name = data.name;
        this.url = data.url;
        this.createdAt = data.createdAt;
    }
}

