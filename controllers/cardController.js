import * as cardRepository from "../data/cardRepository.js";

export async function getAllByUserId(req, res) {
  const id = req.userId;
  const { groupname } = req.query;
  if (groupname === "모든 그룹")
    return res.status(200).json(await cardRepository.getAllByUserId(id));
  if (groupname === "그룹 미지정")
    return res.status(200).json(await cardRepository.getByGroupIsNull(id));
  return res
    .status(200)
    .json(
      await (groupname
        ? cardRepository.getByGroupName(id, groupname)
        : cardRepository.getAllByUserId(id))
    );
}

export async function getByGroupName(req, res) {
  const { groupname } = req.query;

  const cards = await cardRepository.getByGroupName(groupname);

  res.status(200).json(cards);
}

export async function cardCreate(req, res) {
  const { word, mean, memo, group_id } = req.body;
  const id = req.userId;

  const card = {
    id,
    word,
    mean,
    memo: memo || null,
    group_id: group_id || null,
  };

  const cards = await cardRepository.create(card);

  res.status(201).json(cards);
}

export async function cardUpdate(req, res) {
  const { id } = req.params;
  const { word, mean, memo, group_id, level } = req.body;

  const card = await cardRepository.getById(parseInt(id));
  if (!card) {
    return res.status(404);
  }

  if (card.user_id !== req.userId) {
    return res.sendStatus(403);
  }

  const cards = await cardRepository.update(
    parseInt(id),
    word,
    mean,
    memo,
    group_id,
    level
  );

  res.status(200).json(cards);
}

export async function cardRemove(req, res) {
  const { id } = req.params;

  const card = await cardRepository.getById(parseInt(id));
  if (!card) {
    return res.status(404);
  }

  if (card.user_id !== req.userId) {
    return res.sendStatus(403);
  }

  const cards = await cardRepository.remove(parseInt(id), req.userId); // return cards after card delete.

  res.status(200).json(cards);
}

export async function random(req, res) {
  const { groupname, limit } = req.query;

  if (!req.userId) {
    return res.sendStatus(403);
  }

  const cards = await cardRepository.random(req.userId, groupname, limit); // return cards after card delete.

  res.status(200).json(cards);
}
