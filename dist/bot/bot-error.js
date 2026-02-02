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
exports.botErrorHandler = void 0;
const text_1 = require("../config/text");
const botErrorHandler = (bot) => {
    bot.catch((error) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(text_1.ErrorMessage.DEFAULT, ": ", error);
        if (error.ctx) {
            yield error.ctx.reply(text_1.ErrorMessage.NO_STREAM);
        }
    }));
};
exports.botErrorHandler = botErrorHandler;
