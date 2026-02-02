import type { Bot } from "grammy";
import { getGreetingText, getHelpText } from "./text";

export const getCommands = (bot: Bot) => {
  // Команды
  bot.command("info", ctx => ctx.reply(getGreetingText(ctx.from?.first_name)))
  bot.command('help', ctx => ctx.reply(getHelpText()))
  // Дебаг
  console.log("Активные комманды: " + "\n" + getHelpText())
}