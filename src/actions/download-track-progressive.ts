import axios from "axios";
import path from "node:path";
import { sanitizeFilename } from "../utils/sanitize-file-name";
import fs from "node:fs";
import { getClientId } from "../config/config";
import { Track, Transcoding } from "../types/types";

export const downloadTrackProgressive = async (track: Track, progressiveTranscoding: Transcoding, pathToMusic: string) => {
  const CLIENT_ID = getClientId();
  const { data } = await axios.get(progressiveTranscoding.url, {
    params: {
      client_id: CLIENT_ID,
      track_authorization: track.track_authorization,
    },
  });

  const response = await axios.get(data.url, { responseType: "stream" });
  const filePath = path.resolve(pathToMusic, `${ sanitizeFilename(track.title) }.mp3`);
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return filePath;
}