import { db } from "../db/database.js";

export async function getById(id) {
  return db
    .execute(
      `SELECT c.id, c.user_id, c.group_id, g.group_name, c.word, c.mean, c.memo, c.level, c.createAt
    FROM myvoca.cards as c LEFT OUTER JOIN myvoca.groups as g
    ON c.group_id = g.id
    WHERE c.id = ?
    ORDER BY c.createAt DESC;`,
      [id]
    ) //
    .then((result) => result[0][0]);
}

export async function getAllByUserId(id) {
  return db
    .execute(
      `SELECT c.id, c.user_id, c.group_id, g.group_name, c.word, c.mean, c.memo, c.level, c.createAt
    FROM myvoca.cards as c LEFT OUTER JOIN myvoca.groups as g
    ON c.group_id = g.id
    WHERE c.user_id = ?
    ORDER BY c.createAt DESC`,
      [id]
    ) //
    .then((result) => result[0]);
}

export async function getByGroupName(id, name) {
  console.log(name);
  return db
    .execute(
      `SELECT c.id, c.user_id, c.group_id, g.group_name, c.word, c.mean, c.memo, c.level, c.createAt
      FROM myvoca.cards as c LEFT OUTER JOIN myvoca.groups as g
      ON c.group_id = g.id
      WHERE c.user_id = ?
      AND g.group_name = ?
      ORDER BY c.createAt DESC;`,
      [id, name]
    ) //
    .then((result) => result[0]);
}

export async function getByGroupIsNull(id) {
  return db
    .execute(
      `SELECT c.id, c.user_id, c.group_id, g.group_name, c.word, c.mean, c.memo, c.level, c.createAt
      FROM myvoca.cards as c LEFT OUTER JOIN myvoca.groups as g
      ON c.group_id = g.id
      WHERE c.user_id = ?
      AND g.group_name IS NULL
      ORDER BY c.createAt DESC;`,
      [id]
    ) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(
      `SELECT c.*, u.username FROM cards as c LEFT OUTER JOIN users as u ON c.user_id = u.id WHERE u.username = ?`,
      [username]
    )
    .then((result) => result[0]);
}
// export async function getAllByGroup(group){}
// export async function getAllByLevel(level){}
export async function create(card) {
  const { id, word, mean, memo, group_id } = card;
  console.log(card);
  return db
    .execute(
      `INSERT INTO cards (user_id, word, mean,  memo, group_id) VALUES (?, ?, ?, ?, ?)`,
      [id, word, mean, memo, group_id]
    )
    .then((result) => getById(result[0].insertId));
}

export async function csvCreate(cards, userId) {
  const data = cards.map(async (card) => {
    return await db
      .execute(
        `INSERT INTO cards (user_id, word, mean, group_id) VALUES (?, ?, ?, ?)`,
        [userId, card.word, card.mean, card.group_id]
      )
      .then((result) => getById(result[0].insertId));
  });

  return data;
}

export async function update(id, word, mean, memo, group_id, level) {
  console.log(id, word, mean, memo, group_id, level);
  return db
    .execute(
      `UPDATE cards SET word = ?, mean = ?, memo = ?, group_id = ?, level = ? WHERE id = ?`,
      [word, mean, memo, group_id, level, id]
    )
    .then(() => getById(id));
}

export async function remove(id, userId) {
  const card = getById(id);
  return db
    .execute(`DELETE FROM cards WHERE id = ?`, [id]) //
    .then(() => card);
}
export async function random(userId, groupname) {
  const query = `SELECT c.id, c.user_id, c.group_id, g.group_name, c.word, c.mean, c.memo, c.level, c.createAt
  FROM myvoca.cards as c LEFT OUTER JOIN myvoca.groups as g
  ON c.group_id = g.id
  WHERE c.user_id = ${userId} ${
    groupname
      ? groupname === "모든 그룹"
        ? ""
        : `AND g.group_name = "${groupname}" `
      : ""
  }
  ORDER BY RAND() `;

  console.log(query);

  return db.execute(query).then((result) => result[0]);
}
