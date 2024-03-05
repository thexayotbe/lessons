import { Router } from "express";
import userModel from "../models";
import jwt from "jsonwebtoken";

const router = Router();
router.get("/", async (req, res) => {
  const [, token] = String(req.headers.authorization).split(" ");
  try {
    const data = await userModel.find();

    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET),
      (error) => {
        return res.status(403).json({ message: error });
      },
    );

    console.log(decoded);
    return res.status(200).json({
      data,
    });
  } catch (erroe) {}
});
router.post("/login", (req, res) => {});
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { _id, role } = await userModel.create({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      { name, email, role, _id },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "15sec",
      },
    );
    return res.status(201).json({
      message: "Success",
      token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
