import axios from 'axios'
import { Track } from "../types/types";
import { getClientId, getSoundCloudUrlSearch } from "../config/config";

const CLIENT_ID = getClientId();
const SOUND_CLOUD_URL_SEARCH = getSoundCloudUrlSearch()

export const searchMusic = async (query: string, limit = 5): Promise<Track[] | null> => {
  try {
    const res = await axios.get(SOUND_CLOUD_URL_SEARCH, {
      params: {
        q: query,
        limit,
        client_id: CLIENT_ID
      },
    });
    if(res.data.collection.length === 0){
      return null;
    }
    return res.data.collection
  } catch (e: any){
    return null
  }



}