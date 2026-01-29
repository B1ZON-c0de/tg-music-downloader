import "dotenv/config"

export const getBotToken = () => {
  return process.env.BOT_TOKEN || ""
}

export const getClientId = () => {
  return process.env.CLIENT_ID || ""
}

export const getSoundCloudUrlSearch = () => {
  return process.env.SOUND_CLOUD_URL_SEARCH || ""
}