"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommands = void 0;
const text_1 = require("./text");
const getCommands = (bot) => {
    // Команды
    bot.command("info", ctx => { var _a; return ctx.reply((0, text_1.getGreetingText)((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name)); });
    bot.command('help', ctx => ctx.reply((0, text_1.getHelpText)()));
    // Дебаг
    console.log("Активные комманды: " + "\n" + (0, text_1.getHelpText)());
};
exports.getCommands = getCommands;
