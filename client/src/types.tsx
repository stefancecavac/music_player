import { z } from "zod";

export const songSchema = z.object({
  id: z.string({ message: "Id field is required" }).uuid({ message: "Not a valid uuid" }),
  title: z
    .string({ message: "Title field is required" })
    .min(1, { message: "title is required" })
    .max(255, { message: "Maximum 255 characters allowed" }),
  songHref: z.string({ message: "SongHref field is required" }),
  lenght: z.number({ message: "lenght field is required" }),
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
  songHref: z.string({ message: "SongHref field is required" }),
  lenght: z.number({ message: "lenght field is required" }),
});

export type CreateSongData = z.infer<typeof createSongSchema>;
