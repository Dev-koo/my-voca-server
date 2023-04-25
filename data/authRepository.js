import { db } from "../db/database.js";

export async function create(user) {
  const { username, password } = user;
  return db
    .execute(`INSERT INTO users(username, password) VALUES (?, ?);`, [
      username,
      password,
    ])
    .then((result) => result[0].insertId);
}

export async function findByUsername(username) {
  return db
    .execute(`SELECT id, password FROM users WHERE username = ?;`, [username])
    .then((result) => result[0][0]);
}
export async function findById(id) {
  return db
    .execute(`SELECT id, username FROM users WHERE id = ?;`, [id])
    .then((result) => result[0][0]);
}
