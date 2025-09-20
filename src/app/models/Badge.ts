import { IBadge } from "../types";


export class Badge implements IBadge   {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;

    constructor(data: IBadge) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.createdAt = data.createdAt;
    }
}