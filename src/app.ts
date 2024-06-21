import express, { Request, Response } from "express";
import cors from "cors";
import myUserRoute from "./routes/MyUserRoute";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);

app.get("/health", async (req: Request, res: Response) => {
  res.send({
    message: "Health ok!",
  });
});

export default app;
