import axios from "axios";
import { Track, Transcoding } from "../types/types";
import * as path from "node:path";
import * as fs from "node:fs";
import { getClientId } from "../config/config";

const pathToMusic = path.join(__dirname, "..","..","music")

const CLIENT_ID = getClientId();

export const downloadMusic = async (track: Track): Promise<string> => {
  const progressive = track.media.transcodings.find(
    (t: Transcoding) => t.format.protocol === "progressive"
  );

  if (!progressive) throw new Error("No progressive stream");

  const { data } = await axios.get(progressive.url, {
    params: {
      client_id: CLIENT_ID,
      track_authorization: track.track_authorization,
    },
  });

  const response = await axios.get(data.url, { responseType: "stream" });
  const filePath = path.resolve(pathToMusic, `${ track.title.replace(/ /g, "_") }.mp3`);
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return filePath;
};

