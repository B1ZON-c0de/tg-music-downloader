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
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTelegramBot = void 0;
const grammy_1 = require("grammy");
const commands_1 = require("../config/commands");
const search_music_1 = require("../actions/search-music");
const map_tracks_1 = require("../helpers/map-tracks");
const download_music_1 = require("../actions/download-music");
const add_node_tags_1 = require("../utils/add-node-tags");
const startTelegramBot = (token) => {
    const bot = new grammy_1.Bot(token);
    let currentTracks = [];
    const regex = new RegExp(`^[1-5}]$`);
    (0, commands_1.getCommands)(bot);
    bot.hears(regex, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!currentTracks || currentTracks.length === 0)
            return;
        if (!(Number((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text) >= 1) && !(Number((_b = ctx.message) === null || _b === void 0 ? void 0 : _b.text) <= currentTracks.length)) {
            yield ctx.reply(`Выбирите от 1 до ${currentTracks.length}`);
        }
        const track = currentTracks[Number((_c = ctx.message) === null || _c === void 0 ? void 0 : _c.text) - 1];
        const trackDuration = Math.floor(track.duration / 1000);
        const filePath = yield (0, download_music_1.downloadMusic)(track);
        yield (0, add_node_tags_1.addNodeTags)(track, filePath);
        yield ctx.replyWithAudio(new grammy_1.InputFile(filePath), {
            duration: trackDuration,
        });
    }));
    bot.hears(/^Привет$/i, ctx => ctx.reply("Привет, чтобы узнать обо мне больше набери /info"));
    bot.on("message", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        currentTracks = yield (0, search_music_1.searchMusic)(ctx.message.text || '');
        if (!currentTracks) {
            yield ctx.reply("По вашему запросу ничего не найдено...");
            return;
        }
        yield ctx.reply((0, map_tracks_1.mapTracks)(currentTracks));
    }));
    bot.start();
    console.log("Бот запущен");
};
exports.startTelegramBot = startTelegramBot;
