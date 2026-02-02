import { Track } from "../types/types";
import { getImageTrack } from "../actions/get-image-track";
import NodeID3 from "node-id3";

export const addNodeTags = async (track: Track , filePath: string) => {

  const trackTitle = track.title
  const trackArtistUsername = track.user.username

  const tags = {
    title: trackTitle,
    artist: trackArtistUsername,
    ...(await getImageTrack(track) ? {APIC: await getImageTrack(track)} : {})
  };

  NodeID3.update(tags, filePath);
}