import * as groupRepository from "../data/groupRepository.js";

export async function getGroups(req, res) {
  const id = req.userId;
  const { groupname } = req.query;

  if (groupname == null) {
    await groupRepository
      .getGroups(req.userId)
      .then((data) => res.status(201).json(data))
      .catch((error) => res.status(404).json({ log: "error response" }));
  } else {
    await groupRepository
      .getGroup(id, groupname)
      .then((data) => res.status(201).json(data))
      .catch((error) => res.status(404).json({ log: "error response" }));
  }
}

export async function createGroup(req, res) {
  const { group_name } = req.body;

  // 중복 확인
  const response = await groupRepository.getGroupByName(req.userId, group_name);

  if (response) {
    return res.status(404).json({ log: "중복" });
  }

  const data = await groupRepository.createGroup(req.userId, group_name);

  if (!data) {
    return res.status(404).json({ log: "error response" });
  }

  return res.status(201).json(data);
}

export async function removeGroup(req, res) {
  const { id } = req.params;
  const data = await groupRepository.removeGroup(id, req.userId);

  if (!data) {
    return res.status(404).json({ log: "error response" });
  }

  console.log(data);
  return res.status(201).json({ log: "test response" });
}
