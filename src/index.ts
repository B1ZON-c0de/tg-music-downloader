import { getBotToken } from "./config/config";
import { startTelegramBot } from "./bot/bot";


const TOKEN: string = getBotToken()

startTelegramBot(TOKEN)


