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
exports.getHears = void 0;
const grammy_1 = require("grammy");
const download_music_1 = require("../actions/download-music");
const add_node_tags_1 = require("../utils/add-node-tags");
const getHears = (bot, currentTracks) => {
    bot.hears(/^[1-5]$/g, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        console.log(currentTracks);
        const track = currentTracks[Number((_a = ctx.message) === null || _a === void 0 ? void 0 : _a.text) - 1];
        console.log(track);
        const trackDuration = Math.floor(track.duration / 1000);
        const filePath = yield (0, download_music_1.downloadMusic)(track);
        yield (0, add_node_tags_1.addNodeTags)(track, filePath);
        yield ctx.replyWithAudio(new grammy_1.InputFile(filePath), {
            duration: trackDuration,
        });
    }));
};
exports.getHears = getHears;
