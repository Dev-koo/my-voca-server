import { db } from "../db/database.js";

<<<<<<< Updated upstream
export async function getGroup(user_id) {
=======
export async function getGroups(user_id) {
>>>>>>> Stashed changes
  return db
    .execute(
      `SELECT 
        s.id as group_id,
          CASE 
            WHEN GROUPING(s.group_name) = 1 THEN '모든 그룹'
            WHEN GROUPING(s.group_name) = 0 THEN IFNULL(s.group_name, '그룹 미지정')
            END 'group_name'
        , 
         count(s.word) as count
        FROM 
        (
        SELECT g.id, c.user_id, c.word, c.mean, c.memo, g.group_name, c.level, c.createAt, c.updateAt, g.createAt as group_createAt
        FROM 
        myvoca.cards as c LEFT JOIN myvoca.groups as g ON c.group_id = g.id WHERE c.user_id = ${user_id}
        UNION 
        SELECT g.id, g.user_id, c.word, c.mean, c.memo, g.group_name, c.level, c.createAt, c.updateAt, g.createAt as group_createAt
        FROM 
        myvoca.cards as c RIGHT JOIN myvoca.groups as g ON c.group_id = g.id WHERE g.user_id = ${user_id}
        ) as s
        GROUP BY (group_name)
        WITH ROLLUP
        ORDER BY 
          CASE
            WHEN GROUPING(s.group_name) = '모든 그룹' THEN 0
            WHEN GROUPING(s.group_name) = '그룹 미지정' THEN 1 
          END`
    )
    .then((result) => result[0]);
}

export async function getGroupById(user_id, group_id) {
  return db
    .execute(
      `SELECT
    s.id as group_id,
    s.group_name,
     count(s.word) as count
    FROM 
    (
    SELECT g.id, c.user_id, c.word, c.mean, c.memo, g.group_name, c.level, c.createAt, c.updateAt, g.createAt as group_createAt
    FROM 
    myvoca.cards as c LEFT JOIN myvoca.groups as g ON c.group_id = g.id WHERE c.user_id = ${user_id}
    UNION 
    SELECT g.id, g.user_id, c.word, c.mean, c.memo, g.group_name, c.level, c.createAt, c.updateAt, g.createAt as group_createAt
    FROM 
    myvoca.cards as c RIGHT JOIN myvoca.groups as g ON c.group_id = g.id WHERE g.user_id = ${user_id}
    ) as s
    WHERE s.id = ${group_id}
    GROUP BY (group_name);`,
      []
    )
    .then((result) => result[0][0]);
}

export async function getGroupByName(id, name) {
  return db
    .execute("SELECT * FROM `groups` WHERE user_id = ? AND group_name = ?", [
      id,
      name,
    ])
    .then((result) => result[0][0]);
}

// export async function getGroup(id) {
//   return (
//     db
//       // .execute("SELECT group_name, count(*) as count FROM cards WHERE user_id = ? GROUP BY group_name ORDER BY group_name", [id])
//       .execute(
//         `SELECT
//         CASE
//           WHEN GROUPING(group_name) = 1 THEN '모든 그룹'
//           WHEN group_name IS NULL THEN '그룹 미지정' ELSE group_name
//               END group_name, count(*) as count
//        FROM cards WHERE user_id = ? GROUP BY group_name WITH ROLLUP
//       ORDER BY CASE
//          WHEN GROUPING(group_name) = '모든 그룹' THEN 0
//         WHEN GROUPING(group_name) = '그룹 미지정' THEN 1 END;`,
//         [id]
//       )
//       .then((result) => result[0])
//   );
// }

export async function createGroup(user_id, name) {
  return db
    .execute("INSERT INTO `groups` (user_id, group_name) VALUES (?, ?)", [
      user_id,
      name,
    ])
    .then((result) => getGroupById(user_id, result[0].insertId));
}

export async function removeGroup(id, userId) {
  return db
    .execute("DELETE FROM `groups` WHERE id = ?", [id])
    .then(() => getGroup(userId));
}
