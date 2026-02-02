import { Bot, InputFile } from "grammy";
import { getCommands } from "../config/commands";
import { searchMusic } from "../actions/search-music";
import { mapTracks } from "../helpers/map-tracks";
import { Track } from "../types/types";
import { downloadMusic } from "../actions/download-music";
import { addNodeTags } from "../utils/add-node-tags";

export const startTelegramBot = (token: string) => {
  const bot = new Bot(token)


  let currentTracks: Track[] | null = []
  const regex = new RegExp(`^[1-5}]$`)

  getCommands(bot)

  bot.hears(regex, async ctx => {

    if(!currentTracks || currentTracks.length === 0) return;

    if(!(Number(ctx.message?.text) >= 1) && !(Number(ctx.message?.text) <= currentTracks.length)){
      await ctx.reply(`Выбирите от 1 до ${currentTracks.length}`)
    }

    const track = currentTracks[Number(ctx.message?.text) - 1]
    const trackDuration = Math.floor(track.duration / 1000)

    const filePath = await downloadMusic(track)

    await addNodeTags(track, filePath)

    await ctx.replyWithAudio(
      new InputFile(filePath),
      {
        duration: trackDuration,
      }
    )

  })

  bot.hears(/^Привет$/i, ctx => ctx.reply("Привет, чтобы узнать обо мне больше набери /info"))

  bot.on("message", async ctx => {
    currentTracks = await searchMusic(ctx.message.text || '')
    if (!currentTracks) {
      await ctx.reply("По вашему запросу ничего не найдено...")
      return
    }
    await ctx.reply(mapTracks(currentTracks))
  })

  bot.start()
  console.log("Бот запущен")
}
