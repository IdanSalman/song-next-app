import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    driver: "better-sqlite",
    schema: "./drizzle/schema.ts",
    dbCredentials: {
        url: "./chinook.db"
    },
    breakpoints: true,
    out: "./drizzle"
}) 