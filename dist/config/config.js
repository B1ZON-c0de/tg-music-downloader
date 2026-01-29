"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSoundCloudUrlSearch = exports.getClientId = exports.getBotToken = void 0;
require("dotenv/config");
const getBotToken = () => {
    return process.env.BOT_TOKEN || "";
};
exports.getBotToken = getBotToken;
const getClientId = () => {
    return process.env.CLIENT_ID || "";
};
exports.getClientId = getClientId;
const getSoundCloudUrlSearch = () => {
    return process.env.SOUND_CLOUD_URL_SEARCH || "";
};
exports.getSoundCloudUrlSearch = getSoundCloudUrlSearch;
