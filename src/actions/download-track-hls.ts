import { Track, Transcoding } from "../types/types";
import { getClientId } from "../config/config";
import axios from "axios";
import path from "node:path";
import { sanitizeFilename } from "../utils/sanitize-file-name";
import fs from "node:fs";
import m3u8stream from "m3u8stream";

export const downloadTrackHls = async (track: Track, transcoding: Transcoding, pathToMusic: string) => {
  const clientId = getClientId()

  const { data } = await axios.get(transcoding.url, {
    params: {
      client_id: clientId,
      track_authorization: track.track_authorization,
    },
  })

  const response = m3u8stream(data.url);
  const filePath = path.resolve(pathToMusic, `${ sanitizeFilename(track.title) }.mp3`);
  const writer = fs.createWriteStream(filePath);

  response.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  return filePath
}
