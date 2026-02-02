import { Track } from "../types/types";
import axios from "axios";

export const getImageTrack = async (track: Track) => {
  const imageUrl:string | null = track.avatar_url || track.artwork_url
  if(!imageUrl) {
    return null
  }
  const res = await axios.get(imageUrl, { responseType: "arraybuffer" })

  return res.data
}