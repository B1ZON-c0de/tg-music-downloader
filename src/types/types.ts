export interface Command{
  name: string,
  text: string,
}

export interface Track{
  id: number,
  avatar_url: string | null,
  artwork_url: string | null,
  title: string,
  user: { username: string },
  permalink_url: string,
  downloadable: boolean,
  media: {
    transcodings: Transcoding[]
  },
  track_authorization: string,
  duration: number
}

export interface Transcoding{
  url: string,
  preset: string,
  duration: number,
  snipped: boolean,
  format: {
    protocol: string,
    mime_type: string,
  },
  quality: string,
  is_legacy_transcoding: boolean,
}




