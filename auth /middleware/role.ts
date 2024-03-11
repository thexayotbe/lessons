import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.cookie?.replace("token=", ""));

  const decode: any = jwt.verify(
    String(req.headers.cookie?.replace("token=", "")),
    String(process.env.JWT_SECRET),
  );
  if (String(decode?.role) === "user")
    return res.status(403).json({
      message: "error",
    });

  next();
};
