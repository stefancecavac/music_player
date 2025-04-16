import { Request, Response } from "express";
import { createSongService, deleteSongService, getAllSongsService } from "../service/songService";

export const getAllSongsController = async (req: Request, res: Response) => {
  try {
    const songs = await getAllSongsService();

    res.status(200).json(songs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createSongController = async (req: Request, res: Response) => {
  try {
    const { lenght, songHref, title, playlistId, thumbnailUrl } = req.body;

    const createdSong = await createSongService({ lenght, songHref, title, playlistId, thumbnailUrl });

    res.status(200).json(createdSong);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteSongController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const createdSong = await deleteSongService({ id });

    res.status(200).json(createdSong);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
