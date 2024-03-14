import { Response, Router } from "express";
import userModel from "../models";
import jwt from "jsonwebtoken";
import querystring from "querystring";

const const_rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const client_id =
  "604927976478-4khcpll4gvva7cdot4tq0f5hi9v9qen6.apps.googleusercontent.com";
const client_secret = "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";
const redirect_uri = "http://localhost:8080/auth/google/callback";

const router = Router();

const getTokens = async ({
  code,
}: {
  code: string;
}): Promise<{
  access_token: string;
  expires_in: number;
  id_token: string;
}> => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: "authorization_code",
  };
  const data = await (
    await fetch(url, {
      method: "POST",
      body: querystring.stringify(values),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  ).json();
  return data as Promise<{
    access_token: string;
    expires_in: number;
    id_token: string;
  }>;
};
router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code as string;
  const { id_token, access_token } = await getTokens({ code });

  const data = await (
    await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      },
    )
  ).json();
  res.status(200).json({
    message: "Success",
    data,
  });
});
router.get("/login/google", (req, res) => {
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
    `${const_rootUrl}?redirect_uri=${options.redirect_uri}&client_id=${options.client_id}&access_type=${options.access_type}&response_type=${options.response_type}&prompt=${options.prompt}&scope=${options.scope}`,
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
