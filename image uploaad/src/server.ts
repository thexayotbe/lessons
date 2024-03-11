import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import image_router from "./routes";
const app: Application = express();

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);
app.use(express.json());
app.use("/uploads", express.static("uploads/"));
app.use("/image", image_router);

app.listen(8080, async () => {
  console.log("listening  port http://localhost:8080");
});
