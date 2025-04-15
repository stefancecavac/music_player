import { numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export const songTable = pgTable("songs", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  songHref: varchar("link").notNull(),
  lenght: numeric("lenght").notNull(),
});

export const songSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
  title: z
    .string({ message: "Title field is required" })
    .min(1, { message: "title is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
  songHref: z.string({ message: "SongHref field is required" }),
  lenght: z.number({ message: "lenght field is required" }),
  playlistId: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
});

export const createSongShema = z.object({
  title: z
    .string({ message: "Title field is required" })

    .max(255, { message: "Maximum 255 characters allowed" }),
  songHref: z.string({ message: "SongHref field is required" }),
  lenght: z.string({ message: "lenght field is required" }),
  playlistId: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
});

export type CreateSongData = z.infer<typeof createSongShema>;

export const deleteSongSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
});

export type DeleteSongData = z.infer<typeof deleteSongSchema>;
