import { numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import { usersTable } from "./users";

export const playlistTable = pgTable("playlists", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: uuid("userId").references(() => usersTable.id),
});

export const playlistSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
  name: z
    .string({ message: "name field is required" })
    .min(1, { message: "name is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
});

export const createPlaylistSchema = z.object({
  name: z
    .string({ message: "name field is required" })
    .min(1, { message: "name is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
  userId: z.string().uuid(),
});

export type CreatePlaylistData = z.infer<typeof createPlaylistSchema>;
