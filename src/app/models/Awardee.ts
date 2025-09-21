export class Awardee {
    id: number;
    name: string;
    email: string;
    hashedEmail: string;
    createdAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.hashedEmail = data.hashedEmail;
        this.createdAt = data.createdAt;
    }
}
