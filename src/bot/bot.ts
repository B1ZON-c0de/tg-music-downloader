import { Bot, InputFile } from "grammy";
import { getCommands } from "../config/commands";
import { searchMusic } from "../actions/search-music";
import { mapTracks } from "../helpers/map-tracks";
import { Track } from "../types/types";
import { downloadMusic } from "../actions/download-music";
import { addNodeTags } from "../utils/add-node-tags";
import { botErrorHandler } from "./bot-error";

export const startTelegramBot = (token: string) => {
  const bot = new Bot(token)

  botErrorHandler(bot)


  let currentTracks: Track[] = []
  const regex = new RegExp(/^\d+$/)
  getCommands(bot)

  bot.hears(regex, async ctx => {

    const userChoice = Number(ctx.message?.text)


    if (userChoice < 1 || userChoice > currentTracks.length){
      await ctx.reply(`Выберите от 1 до ${ currentTracks.length }`)
      return
    }

    const messageWait = await ctx.reply("Трек скачивается...",)

    const track = currentTracks[Number(ctx.message?.text) - 1]
    const trackDuration = Math.floor(track.duration / 1000)

    try{
      const filePath = await downloadMusic(track)

      await addNodeTags(track, filePath)

      await ctx.replyWithAudio(
        new InputFile(filePath),
        {
          duration: trackDuration,
        }
      )
    } finally{
      await ctx.api.deleteMessage(ctx.chatId, messageWait.message_id)
    }

  })

  bot.hears(/^Привет$/i, ctx => ctx.reply("Привет, чтобы узнать обо мне больше набери /info"))

  bot.on("message:text", async ctx => {

    currentTracks = await searchMusic(ctx.message.text)

    if (currentTracks.length === 0){
      await ctx.reply("Сначала выполните поиск")
      return
    }
    await ctx.reply(mapTracks(currentTracks))

  })

  bot.start()
  console.log("Бот запущен")
}
