import express from "express";
import { validation } from "../middleware/validation";
import { songSchema } from "../db/schema/song";
import {
  createPLaylistController,
  deletePlaylistController,
  getAllPlaylistsController,
  getSinglePlaylistController,
  updatePlaylistController,
} from "../controllers/playlistController";
import { playlistSchema } from "../db/schema/playlist";
import authenticate from "../middleware/authentication";

const router = express.Router();

router.use(authenticate);
router.get("/", getAllPlaylistsController);
router.get("/:id", getSinglePlaylistController);

router.post("/", validation(playlistSchema.pick({ name: true })), createPLaylistController);
router.delete("/", validation(playlistSchema.pick({ id: true })), deletePlaylistController);
router.put("/", validation(playlistSchema.pick({ id: true, name: true })), updatePlaylistController);

export default router;
