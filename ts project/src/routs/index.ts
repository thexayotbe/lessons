import { Request, Response, Router } from "express";
import {
  GardeningModel,
  DomesticModel,
  HomepotModel,
} from "../shemas/plantsschema";

const router = Router();

function findType(type: string): any {
  if (type == "gardening") return GardeningModel;
  else if (type == "domestic") return DomesticModel;
  else if (type == "homepot") return HomepotModel;
}
router.get("/flower/:type", async (req: Request, res: Response) => {
  try {
    const modal = findType(req.params.type);
    return res.status(200).json({
      message: "success",
      data: await modal.find(),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});

router.post("/flower/:type", async (req: Request, res: Response) => {
  const { image, title, description, type } = req.body;
  try {
    const model = findType(req.params.type);
    await model.create({
      image,
      title,
      description,
      type,
    });
    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});
router.delete("/flower/:type/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const model = findType(req.params.type);
    await model.deleteOne({ _id });
    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});

// PUT route to update a plant
router.put("/flower/:type/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  const data = req.body;
  try {
    const model = findType(req.params.type);
    await model.replaceOne({ _id }, { ...data });
    return res.status(201).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
});

export default router;
