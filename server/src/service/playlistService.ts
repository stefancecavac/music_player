import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { CreatePlaylistData, playlistTable } from "../db/schema/playlist";
import { playlistSongsTable } from "../db/schema/playlistSongs";
import { songTable } from "../db/schema/song";
import AppError from "../middleware/errorHadler";

export const getAllPlaylistService = async ({ userId }: { userId: string }) => {
  try {
    const playlists = await db.select().from(playlistTable).where(eq(playlistTable.userId, userId));
    return playlists;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const getSinglePlaylistService = async ({ id, userId }: { id: string; userId: string }) => {
  try {
    const data = await db
      .select()
      .from(playlistTable)
      .where(and(eq(playlistTable.id, id), eq(playlistTable.userId, userId)))
      .leftJoin(playlistSongsTable, eq(playlistTable.id, playlistSongsTable.playlistId))
      .leftJoin(songTable, eq(playlistSongsTable.songId, songTable.id));
    const songs = data.filter((item) => item.songs).map((item) => item.songs);

    return {
      id: data[0].playlists.id,
      name: data[0].playlists.name,
      songs: songs,
    };
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};
export const createPlaylistService = async ({ name, userId }: CreatePlaylistData) => {
  try {
    const createdPlaylist = await db.insert(playlistTable).values({ name: name, userId: userId }).returning();
    return createdPlaylist[0];
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};
