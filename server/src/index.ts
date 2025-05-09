import dotenv from "dotenv";
dotenv.config();
import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import songsRouter from "./routes/songRoutes";
import playlistsRouter from "./routes/playlistRoutes";
import authRouter from "./routes/AuthRoute";
import { errroHandler } from "./middleware/errorHadler";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/songs", songsRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/auth", authRouter);

app.use(errroHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get(/(.*)/, (req, res: Response) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port: ${process.env.PORT}`);
});
