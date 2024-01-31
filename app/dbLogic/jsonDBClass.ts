import { readJsonFile, createJsonFile, updateJsonFile, hashString, verifyString } from './utils';


class JsonDatabase {
    private static _instance: JsonDatabase; // Implements a Singleton Design Pattern.
    private baseDbFolder: string;

    constructor(baseFolder: string = "") {
        // TODO Eventually change path to be dynamic
        if (baseFolder == "")
            this.baseDbFolder = "C:/Users/SHarush/Desktop/Projects/song-next-app/json_db"
        else
            this.baseDbFolder = baseFolder

    }

    getPath(tableName: string) {
        return this.baseDbFolder + "/" + tableName + ".json"
    }

    async queryTable(tableName: string) {
        const dbFilePath = this.getPath(tableName)
        return (await readJsonFile(dbFilePath))
    }

    async queryDocument(tableName: string, documentId: string) {
        // Query a specific database/table for a specific document
        const dbFilePath = this.getPath(tableName)
        return (await readJsonFile(dbFilePath))[documentId]
    }

    async createRecord(tableName: string, jsonStringData: string) {
        const dbFilePath = this.getPath(tableName)
        return updateJsonFile(dbFilePath, jsonStringData)
    }

    async createDb(tableName: string, jsonStringData: string) {
        const dbFilePath = this.getPath(tableName)
        return createJsonFile(dbFilePath, jsonStringData)
    }

    async findAll(tableName: string) {
        // Implement logic to retrieve all entities from a database
        return (await this.queryTable(tableName))
    }

    async hashString(item: string) {
        return (await hashString(item))
    }

    async verifyHashedString(item: string, hash: string) {
        return (await verifyString(item, hash))
    }

    public static get Instance() {
        // Used for implementing a Singleton Design Pattern.
        return this._instance || (this._instance = new this());
    }
}

export default function getJsonDB(): JsonDatabase {
    return new JsonDatabase()
}