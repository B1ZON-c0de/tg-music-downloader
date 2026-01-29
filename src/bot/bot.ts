import { Bot, InputFile } from "grammy";
import { getCommands } from "../config/commands";
import { searchMusic } from "../actions/search-music";
import { mapTracks } from "../helpers/map-tracks";
import { Track } from "../types/types";
import { downloadMusic } from "../actions/download-music";

export const startTelegramBot = (token: string) => {
  const bot = new Bot(token)

  let currentTracks: Track[] = []

  getCommands(bot)

  bot.hears(/^[1-5]$/g, async ctx => {

    const track = currentTracks[Number(ctx.message?.text) - 1]
    const trackTitle = currentTracks[Number(ctx.message?.text) - 1].title
    const trackArtistUsername = currentTracks[Number(ctx.message?.text) - 1].user.username
    const trackDuration = Math.floor(currentTracks[Number(ctx.message?.text) - 1].duration / 1000)

    await ctx.replyWithAudio(
      new InputFile(await downloadMusic(track)),
      {
        caption: trackTitle,
        performer: trackArtistUsername,
        duration: trackDuration,
      }
    )

  })

  bot.hears(/^Привет$/i, ctx => ctx.reply("Привет, чтобы узнать обо мне больше набери /info"))

  bot.on("message", async ctx => {
    currentTracks = await searchMusic(ctx.message.text || '')
    await ctx.reply(mapTracks(currentTracks))
  })

  bot.start()
  console.log("Бот запущен")
}
