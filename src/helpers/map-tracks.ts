import { Track } from "../types/types";

export const mapTracks = (tracks: Track[]) => {
  return tracks.map((track, index) => `${ index + 1 }. ${ track.user.username } - ${ track.title }`).join("\n")
}