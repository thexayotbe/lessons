import { Router } from "express";
import userModel from "../models";
import jwt from "jsonwebtoken";
import isAdmin from "../middleware/role";

const router = Router();
router.get("/", isAdmin, async (req, res) => {
  const [, token] = String(req.headers.authorization).split(" ");
  try {
    const data = await userModel.find();
    // const decoded = jwt.verify(
    //   token,
    //   String(process.env.JWT_SECRET),
    //   (error) => {
    //     return res.status(403).json({ message: error });
    //   },
    // );
    // console.log(decoded);
    res.cookie(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCIsImVtYWlsIjoidGVzdEBtYWlsLnJ1Iiwicm9sZSI6InVzZXIiLCJfaWQiOiI2NWVlOTExY2IxZmVjY2U4YjA0N2QwMDQiLCJpYXQiOjE3MTAxMzM1MzJ9.ZZX2lTvXJ3bE2lCIhyLAOZlOjhPGsyxpBZ0fPFgJ_Do",
      {
        httpOnly: true,
        secure: true,
        // signed: true,
      },
    );
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
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
