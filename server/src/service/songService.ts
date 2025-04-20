import { eq } from "drizzle-orm";
import { db } from "../db";
import { CreateSongData, DeleteSongData, songTable } from "../db/schema/song";
import AppError from "../middleware/errorHadler";

export const getAllSongsService = async () => {
  try {
    const songs = await db.select().from(songTable);
    return songs;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
export const createSongService = async ({ title, lenght, songHref, playlistId, thumbnailUrl }: CreateSongData) => {
  try {
    const createdSong = await db.insert(songTable).values({ title, lenght, songHref, thumbnailUrl, playlistId }).returning();

    return createdSong[0];
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
export const moveSongService = async ({ id, playlistId }: { id: string; playlistId: string }) => {
  try {
    const movedSong = await db.update(songTable).set({ playlistId: playlistId }).where(eq(songTable.id, id)).returning();

    return movedSong[0];
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
export const deleteSongService = async ({ id }: DeleteSongData) => {
  try {
    const deletedSong = await db.delete(songTable).where(eq(songTable.id, id)).returning();
    return deletedSong[0];
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
