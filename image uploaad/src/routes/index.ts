import { Request, Response, Router } from "express";
import multer, { StorageEngine, diskStorage } from "multer";
import imageModel, { IImage } from "../schema/image.schema";
import { initializeApp } from "firebase/app";

initializeApp({
  apiKey: "AIzaSyDKD0Ku8m5TVmxw-ViqnrlWc-PNJNWTzcY",
  authDomain: "image-upload-e0d36.firebaseapp.com",
  projectId: "image-upload-e0d36",
  storageBucket: "image-upload-e0d36.appspot.com",
  messagingSenderId: "754255460958",
  appId: "1:754255460958:web:5b6158eec69e0adc3912cf",
  measurementId: "G-LZEWCTDEVC",
});

const storage: StorageEngine = diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file?.originalname);
  },
});

const upload = multer({ storage });

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Success",
    data: await imageModel.find<IImage>(),
  });
});

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Success",
  });
});

export default router;
