import { Track, Transcoding } from "../types/types";
import * as path from "node:path";
import * as fs from "node:fs";
import { sanitizeFilename } from "../utils/sanitize-file-name";
import { downloadTrackProgressive } from "./download-track-progressive";
import { downloadTrackHls } from "./download-track-hls";

export const downloadMusic = async (track: Track, pathToMusic: string): Promise<string> => {

  if (!fs.existsSync(pathToMusic)){
    fs.mkdirSync(pathToMusic, { recursive: true });
  }

  const cachedFilepath = path.resolve(pathToMusic, sanitizeFilename(track.title) + ".mp3")
  if (fs.existsSync(cachedFilepath)){
    return cachedFilepath
  }

  const progressive = track.media.transcodings.find(
    (t: Transcoding) => t.format.protocol === "progressive"
  );

  if (progressive){
    return await downloadTrackProgressive(track, progressive, pathToMusic);
  } else{
    const hls = track.media.transcodings.find(
      (t: Transcoding) => t.format.protocol === "hls"
    )
    return await downloadTrackHls(track, hls!, pathToMusic)
  }


};

