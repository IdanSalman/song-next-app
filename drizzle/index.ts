"use server"
import * as Schema from './schema'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { eq, sql } from 'drizzle-orm';

// TODO Change the path to be dynamic (and accurate, it refers to .next folder sometimes).
const database = new Database("C:/Users/SHarush/Desktop/Projects/song-next-app/chinook.db")
const db = drizzle(database, { schema: Schema })

export async function findAllTracksFiltered(filter: string) {
    // Implemented logic to retrieve all entities from tracks database filtered accordingly
    const result = await db.select()
        .from(Schema.tracks)
        .leftJoin(Schema.albums, eq(Schema.albums.albumId, Schema.tracks.albumId))
        .leftJoin(Schema.artists, eq(Schema.albums.artistId, Schema.artists.artistId))
        .where(
            sql`
            LOWER(${Schema.artists.name}) LIKE ${filter + '%'} OR
            LOWER(${Schema.albums.title}) LIKE ${filter + '%'} OR
            LOWER(${Schema.tracks.name}) LIKE ${filter + '%'} 
            `
        )
        .limit(5) // This is the current max entries

    return result
}

export async function findUser(username: string) {
    return await db.select({
        username: Schema.users.username,
        password: Schema.users.password
    })
        .from(Schema.users)
        .where(eq(Schema.users.username, username))
        .execute()
}

export async function addUser(
    username: string,
    password: string,
    userType: string,
) {
    if (userType != "e" && userType != "c")
        return

    let matchedId = -1
    let result

    if (userType == 'e') {
        result = await db.insert(Schema.employees)
            .values({
                lastName: "",
                firstName: "",
                title: "",
                reportsTo: 15,
                birthDate: "",
                hireDate: "",
                address: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                phone: "",
                fax: "",
                email: "",
            })
            .returning({ id: Schema.employees.employeeId })

        matchedId = result[0].id
    }
    if (userType == 'c') {
        result = await db.insert(Schema.customers)
            .values({
                firstName: "",
                lastName: "",
                company: "",
                address: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                phone: "",
                fax: "",
                email: "",
                supportRepId: 3,
            })
            .returning({ id: Schema.customers.customerId })
        matchedId = result[0].id
    }

    if (matchedId == -1)
        return

    await db.insert(Schema.users).values({
        username: username,
        password: password,
        userType: userType,
        matchedId: matchedId,
    })
}