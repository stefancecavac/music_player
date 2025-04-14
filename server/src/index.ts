import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import songsRouter from "./routes/songRoutes";
import { errroHandler } from "./middleware/errorHadler";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/songs", songsRouter);

app.use(errroHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port: ${process.env.PORT}`);
});
