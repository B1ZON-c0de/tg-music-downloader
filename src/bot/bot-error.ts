import { Bot } from "grammy";
import { ErrorMessage } from "../config/text";

export const botErrorHandler = (bot: Bot) => {
  bot.catch(async (error) => {
    console.log(ErrorMessage.DEFAULT, ": ", error)

    if (error.ctx){
      await error.ctx.reply(ErrorMessage.NO_STREAM)
    }
  })

}