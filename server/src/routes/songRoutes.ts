import express from "express";
import { createSongController, deleteSongController, getAllSongsController } from "../controllers/songController";
import { validation } from "../middleware/validation";
import { songSchema } from "../db/schema/song";
import authenticate from "../middleware/authentication";

const router = express.Router();

router.use(authenticate);

router.get("/", getAllSongsController);
router.post("/", validation(songSchema.pick({ lenght: true, songHref: true, title: true, playlistId: true })), createSongController);
router.delete("/", validation(songSchema.pick({ id: true })), deleteSongController);

export default router;
