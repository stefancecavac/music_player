import express from "express";
import { validation } from "../middleware/validation";
import { songSchema } from "../db/schema/song";
import { createPLaylistController, getAllPlaylistsController, getSinglePlaylistController } from "../controllers/playlistController";
import { playlistSchema } from "../db/schema/playlist";

const router = express.Router();

router.get("/", getAllPlaylistsController);
router.get("/:id", getSinglePlaylistController);

router.post("/", validation(playlistSchema.pick({ name: true })), createPLaylistController);

export default router;
