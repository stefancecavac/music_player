import { z } from "zod";

export const songSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
  title: z
    .string({ message: "Title field is required" })
    .min(1, { message: "title is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
  songHref: z.string({ message: "SongHref field is required" }),
  lenght: z.number({ message: "lenght field is required" }),
  thumbnailUrl: z.string({ message: "Thumbnail required" }),
});

export type SongData = z.infer<typeof songSchema>;

export const playlistSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
  name: z
    .string({ message: "Title field is required" })
    .min(1, { message: "title is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
  songs: z.array(songSchema),
});

export type PlaylistData = z.infer<typeof playlistSchema>;

export const createSongSchema = z.object({
  title: z
    .string({ message: "Title field is required" })
    .min(1, { message: "title is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
  songHref: z
    .string()
    .url()
    .regex(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}(&.*)?$/, "Must be a valid YouTube watch URL"),
  lenght: z.number({ message: "lenght field is required" }),
  thumbnailUrl: z.string({ message: "Thumbnail required" }),
  playlistId: z.string().uuid(),
});

export type CreateSongData = z.infer<typeof createSongSchema>;

export const createPlaylistSchema = z.object({
  userId: z.string({ message: "userId field is required" }).uuid({ message: "Not a valid uuid" }),
  name: z
    .string({ message: "name field is required" })
    .min(1, { message: "name is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
});

export type CreatePlaylistData = z.infer<typeof createPlaylistSchema>;

export const deletePlaylistsSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
  userId: z.string({ message: "userId field is required" }).uuid({ message: "Not a valid uuid" }),
});

export type DeletePlaylistData = z.infer<typeof deletePlaylistsSchema>;

export const updatePlaylistSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
  name: z
    .string({ message: "name field is required" })
    .min(1, { message: "name is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
});

export type UpdatePlaylistData = z.infer<typeof updatePlaylistSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
});

export type UserData = z.infer<typeof userSchema>;
