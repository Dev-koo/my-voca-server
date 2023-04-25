import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as authRepository from "../data/authRepository.js";

const AUTH_ERROR = { message: "Authorization Error" };

export function isAuth(req, res, next) {
  const authHeader = req.header("Authorization");
<<<<<<< Updated upstream

=======
  // 2. 헤더에 없거나 bearer 로 시작하지 않으면 에러(401)과 에러메세지를 보낸다.
>>>>>>> Stashed changes
  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, config.jwt.scretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await authRepository.findById(decoded.id);

    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
}
