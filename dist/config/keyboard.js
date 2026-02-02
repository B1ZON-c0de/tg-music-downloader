"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInlineKeyboardTracks = void 0;
const grammy_1 = require("grammy");
const getInlineKeyboardTracks = (tracks) => {
    const inlineButtons = tracks.map(({ title, user, id }) => [grammy_1.InlineKeyboard
            .text(`${user.username} - ${title}`, `track_${id}`)]);
    return grammy_1.InlineKeyboard.from(inlineButtons);
};
exports.getInlineKeyboardTracks = getInlineKeyboardTracks;
