import { Bot, BotError, InputFile } from "grammy";
import { getCommands } from "../config/commands";
import { searchMusic } from "../actions/search-music";
import { Track } from "../types/types";
import { downloadMusic } from "../actions/download-music";
import { addNodeTags } from "../utils/add-node-tags";
import { botErrorHandler } from "./bot-error";
import { getInlineKeyboardTracks } from "../config/keyboard";
import { cleanOldTracks } from "../utils/clear-old-tracks";
import path from "node:path";
import { textCommands } from "../config/constants";

export const startTelegramBot = (token: string) => {
  const bot = new Bot(token)
  const pathToMusic = path.join(__dirname, "..", "..", "music")

  bot.api.setMyCommands([ ...textCommands.map(textCommand => ({
    command: textCommand.name,
    description: textCommand.text
  })) ])

  botErrorHandler(bot)

  let currentTracks: Track[] = []

  getCommands(bot)

  bot.hears(/^Привет$/i, ctx => ctx.reply("Привет, чтобы узнать обо мне больше набери /info"))

  bot.on("message:text", async ctx => {

    currentTracks = await searchMusic(ctx.message.text)

    if (currentTracks.length === 0){
      await ctx.reply("Сначала выполните поиск")
      return
    }
    await ctx.reply("Выберите трек: ", {
      reply_markup: getInlineKeyboardTracks(currentTracks)
    })

  })

  bot.callbackQuery(/^track_(\d+)$/, async ctx => {
    await ctx.answerCallbackQuery();
    const track = currentTracks.find(({ id }) => id === Number(ctx.match[1]))!


    const messageWait = await ctx.reply("Трек скачивается...",)
    const trackDuration = Math.floor(track.duration / 1000)

    try{
      const filePath = await downloadMusic(track, pathToMusic)

      await addNodeTags(track, filePath)

      await ctx.replyWithAudio(
        new InputFile(filePath),
        {
          duration: trackDuration,
        }
      )

      cleanOldTracks(pathToMusic)

    } catch (e){
      throw new BotError(e, ctx)
    } finally{
      if (ctx.chatId){
        await ctx.api.deleteMessage(ctx.chatId, messageWait.message_id)
        await ctx.api.deleteMessage(ctx.chatId, Number(ctx.callbackQuery.message?.message_id))
      }

    }

  })

  bot.start()
  console.log("Бот запущен")
}
