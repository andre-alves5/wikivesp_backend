import jwt from "jsonwebtoken";
import { promisify } from "util";
import env from "../../config/env.js";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Erro: Token não encontrado!",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, env.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Erro: Token inválido!",
    });
  }
};
