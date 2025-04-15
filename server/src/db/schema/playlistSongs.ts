import { numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { playlistTable } from "./playlist";
import { songTable } from "./song";

export const playlistSongsTable = pgTable("playlistSongsTable", {
  playlistId: uuid("playlist_id")
    .notNull()
    .references(() => playlistTable.id, { onDelete: "cascade" }),
  songId: uuid("song_id")
    .notNull()
    .references(() => songTable.id, { onDelete: "cascade" }),
});
