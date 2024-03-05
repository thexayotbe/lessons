import { Request, Response, Router } from "express";
import multer, { StorageEngine, diskStorage } from "multer";
import path from "path";
import imageModel, { IImage } from "../schema/image.schema";
import { v2 } from "cloudinary";
import fs from "fs";
// ! Setu
const storage: StorageEngine = diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    // Specify the directory where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    const filename = `file-${uniqueSuffix}${fileExt}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// ! cloudinary

const config = v2.config({
  cloud_name: "dqpay4ed7",
  api_key: "329931917117719",
  api_secret: "jESEggFUlYUKfH3TCylyZr7nKx0",
});

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  //const response = await v2.uploader.destroy("rp5xjq78wipmdeiqywcl");
  const response = await v2.api.delete_resources([
    "raoj8xphujgdfcj7ihlv",
    "cczhm4tldycxtkoxihov",
  ]);

  console.log(response);
  return res.status(200).json({
    message: "Success",
    data: await imageModel.find<IImage>(),
  });
});

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  const uploadedFile = await v2.uploader.upload(String(req.file?.path));
  const createdData = await imageModel.create<IImage>({
    title: String(req.file?.originalname),
    image_source: String(req.file?.path),
    description: String(req.file?.originalname),
  });
  // fs.unlink(String(req.file?.path), (err) => {
  //   if (err) throw new Error("Something went wrong");
  //   console.log("Image deleted successfully");
  // });
  return res.status(200).json({
    message: "Success",
    file: createdData,
  });
});

export default router;
