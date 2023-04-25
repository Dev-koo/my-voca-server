import * as cardRepository from "../data/cardRepository.js";
import { parse } from "csv-parse";

export async function upload(req, res) {
  const file = req.body;

  parse(file, { delimiter: "," }, async (err, records, info) => {
    const cards = records.map((record) => {
      const prevRecord = { word: record[0], mean: record[1] };
      return prevRecord;
    });

    res.status(201).json(cards);
  });
}

export async function save(req, res) {
  const cards = req.body.cards;
  const userId = req.userId;

  const data = await cardRepository.csvCreate(cards, userId);

  Promise.all(data).then((crads) => res.status(201).json(crads));
}
