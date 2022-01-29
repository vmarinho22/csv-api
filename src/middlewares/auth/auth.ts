import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {

  const BearerToken = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];
  
  if (!BearerToken || BearerToken === undefined)  {
    return res.status(401).json({ status: 0, response: "Necessário enviar token para validação" });
  }

  const token = BearerToken.split(" ")[1];

  try {
    const secret:  string | undefined = process.env.SECRET;

    await jwt.verify(token, secret || '');

    next();

  } catch (err) {
    return res.status(401).json({ status: 0, response: "Token invalido!!" });
  }
}