import { Response, Router } from "express";
import userModel from "../models";
import jwt from "jsonwebtoken";

const const_rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const client_id =
  "604927976478-4khcpll4gvva7cdot4tq0f5hi9v9qen6.apps.googleusercontent.com";
const router = Router();
router.post("/login/google", (req, res) => {
  const options = {
    redirect_uri: "http://localhost:8080/auth/google/callback",
    client_id,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  return res.redirect(
    `${const_rootUrl}?redirect_url=${options.redirect_uri}&client_id=${options.client_id}&access_type=${options.access_type}&response_type=${options.response_type}&prompt=${options.prompt}&scope=${options.scope}`,
  );
});

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
