import { lucia, type KeySchema, type LuciaErrorConstructor } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import client from "$lib/server/prisma";


// expect error (see next section)
export const auth = lucia({
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    adapter: prisma(client)
})

export type Auth = typeof auth;