import * as fs from "node:fs";
import * as path from "node:path";
import { getMaxTracks } from "../config/config";

export const cleanOldTracks = (pathname: string) => {
  const MAX_TRACKS = getMaxTracks()

  const files = fs.readdirSync(pathname)
    .map(file => ({
      name: file,
      time: fs.statSync(path.join(pathname, file)).mtime.getTime(),
    }))
    .sort((a, b) => a.time - b.time)

  while (files.length > MAX_TRACKS){
    const oldestTrack = files.shift()
    if (oldestTrack) fs.unlinkSync(path.join(pathname, oldestTrack.name))
  }
}