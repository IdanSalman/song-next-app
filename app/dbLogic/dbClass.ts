import { PrismaClient } from '@prisma/client/edge'

export type customerData = {
    CustomerId: number;
    FirstName: string;
    LastName: string;
    Company: string;
    Address: string;
    City: string;
    State: string;
    Country: string;
    PostalCode: string;
    Phone: string;
    Fax: string;
    SupportRepId: number;
}

export class PrismaDatabase {
    private static _instance: PrismaDatabase; // Implements a Singleton Design Pattern.
    private prisma = new PrismaClient()

    constructor() {
        // Initialize your database connection here
        this.prisma = new PrismaClient(/* database configuration */);
    }

    async create(entity: customerData): Promise<customerData> {
        // Implement logic to create a new entity in the database
        const createdEntity = await this.prisma.create(entity);
        return createdEntity;
    }

    async read(id: number): Promise<customerData | null> {
        // Implement logic to retrieve an entity from the database based on ID
        const entity = await this.prisma.read(id);
        return entity || null;
    }

    async update(id: number, updatedData: Partial<customerData>): Promise<customerData | null> {
        // Implement logic to update an entity in the database based on ID
        const updatedEntity = await this.prisma.update(id, updatedData);
        return updatedEntity || null;
    }

    async delete(id: number): Promise<boolean> {
        // Implement logic to delete an entity from the database based on ID
        const success = await this.prisma.delete(id);
        return success;
    }

    async findAll(tableName: string): Promise<customerData[]> {
        // Implement logic to retrieve all entities from the database
        const entities = await this.prisma.tracks.findAll();
        return entities;
    }

    public static get Instance() {
        // Used for implementing a Singleton Design Pattern.
        return this._instance || (this._instance = new this());
    }

}

