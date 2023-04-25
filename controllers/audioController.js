import { client } from "../ttsClient.js";

export async function getAudio(req, res) {
  const { word } = req.params;
  const request = {
    input: { text: word },
    voice: {
      languageCode: "en-US",
      ssmlGender: "MALE",
      name: "en-US-Wavenet-D",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);

  return res.status(200).send(response.audioContent);
}
