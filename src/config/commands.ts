import type { Bot } from "grammy";
import { getGreetingText, getHelpText } from "./text";

export const getCommands = (bot: Bot) => {
  // Команды
  bot.command("start", ctx => ctx.reply(getGreetingText(ctx.from?.first_name), { parse_mode: "HTML" },))
  // Дебаг
  console.log("Активные комманды: " + "\n" + getHelpText())
}