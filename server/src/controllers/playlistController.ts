import { NextFunction, Request, Response } from "express";
import {
  createPlaylistService,
  deletePlaylistService,
  getAllPlaylistService,
  getSinglePlaylistService,
  updatePlaylistNameService,
} from "../service/playlistService";

export const getAllPlaylistsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.userId;

    const playlists = await getAllPlaylistService({ userId });

    res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
};

export const getSinglePlaylistController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const playlist = await getSinglePlaylistService({ id, userId });

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
};

export const createPLaylistController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    const createdPlaylist = await createPlaylistService({ name, userId });

    res.status(200).json(createdPlaylist);
  } catch (error) {
    next(error);
  }
};

export const updatePlaylistController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, id } = req.body;

    const updatedPlaylist = await updatePlaylistNameService({ name, id });

    res.status(200).json(updatedPlaylist);
  } catch (error) {
    next(error);
  }
};

export const deletePlaylistController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const userId = req.user.userId;

    const deletedPlaylist = await deletePlaylistService({ id, userId });

    res.status(200).json(deletedPlaylist);
  } catch (error) {
    next(error);
  }
};
