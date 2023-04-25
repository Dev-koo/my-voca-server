import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as authRepository from "../data/authRepository.js";

export async function signup(req, res) {
  const { username, password } = req.body;

  const user = await authRepository.findByUsername(username);

  if (user) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hash = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await authRepository.create({
    username,
    password: hash,
  });
  const token = createToken(userId);
  res.status(201).json({ username, token });
}

export async function login(req, res) {
  const { username, password } = req.body;

  // 1. authRepository 에서 username 의아암호화된 password를 가온온다.
  const user = await authRepository.findByUsername(username);
  if (!user) {
    return res
      .status(401)
      .json({ message: `please, check your username or password` });
  }
  // 2. 1에서 가져온 password(암호화된) 와 입력된 패스워드를 compare 로 비교한다.
  const isValidPassword = await bcrypt.compare(password, user.password);
  // 3. 2의 결과값이 true 이면 username과 token을 생성해서 response에 보내준다.
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: `please, check your username or password` });
  }
  const token = createToken(user.id);

  res.status(200).json({ username, token });
}

export async function me(req, res) {
  const user = await authRepository.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ username: user.username, token: req.token });
}

function createToken(id) {
  return jwt.sign({ id }, config.jwt.scretKey, {
    expiresIn: config.jwt.expiresSec,
  });
}
