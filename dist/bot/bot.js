"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTelegramBot = void 0;
const grammy_1 = require("grammy");
const commands_1 = require("../config/commands");
const search_music_1 = require("../actions/search-music");
const download_music_1 = require("../actions/download-music");
const add_node_tags_1 = require("../utils/add-node-tags");
const bot_error_1 = require("./bot-error");
const keyboard_1 = require("../config/keyboard");
const clear_old_tracks_1 = require("../utils/clear-old-tracks");
const node_path_1 = __importDefault(require("node:path"));
const startTelegramBot = (token) => {
    const bot = new grammy_1.Bot(token);
    const pathToMusic = node_path_1.default.join(__dirname, "..", "..", "music");
    (0, bot_error_1.botErrorHandler)(bot);
    let currentTracks = [];
    (0, commands_1.getCommands)(bot);
    bot.hears(/^Привет$/i, ctx => ctx.reply("Привет, чтобы узнать обо мне больше набери /info"));
    bot.on("message:text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        currentTracks = yield (0, search_music_1.searchMusic)(ctx.message.text);
        if (currentTracks.length === 0) {
            yield ctx.reply("Сначала выполните поиск");
            return;
        }
        yield ctx.reply("Выберите трек: ", {
            reply_markup: (0, keyboard_1.getInlineKeyboardTracks)(currentTracks)
        });
    }));
    bot.callbackQuery(/^track_(\d+)$/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const track = currentTracks.find(({ id }) => id === Number(ctx.match[1]));
        const messageWait = yield ctx.reply("Трек скачивается...");
        const trackDuration = Math.floor(track.duration / 1000);
        try {
            const filePath = yield (0, download_music_1.downloadMusic)(track, pathToMusic);
            yield (0, add_node_tags_1.addNodeTags)(track, filePath);
            yield ctx.replyWithAudio(new grammy_1.InputFile(filePath), {
                duration: trackDuration,
            });
            (0, clear_old_tracks_1.cleanOldTracks)(pathToMusic);
        }
        catch (e) {
            throw new grammy_1.BotError(e, ctx);
        }
        finally {
            if (ctx.chatId) {
                yield ctx.api.deleteMessage(ctx.chatId, messageWait.message_id);
                yield ctx.api.deleteMessage(ctx.chatId, Number((_a = ctx.callbackQuery.message) === null || _a === void 0 ? void 0 : _a.message_id));
            }
        }
    }));
    bot.start();
    console.log("Бот запущен");
};
exports.startTelegramBot = startTelegramBot;
