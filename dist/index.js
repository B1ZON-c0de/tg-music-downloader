"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const bot_1 = require("./bot/bot");
const TOKEN = (0, config_1.getBotToken)();
(0, bot_1.startTelegramBot)(TOKEN);
