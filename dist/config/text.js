"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpText = exports.getGreetingText = exports.ErrorMessage = void 0;
const constants_1 = require("./constants");
exports.ErrorMessage = {
    DEFAULT: "Ошибка в боте",
    NO_STREAM: "Пока не можем скачивать аудио в данном формате..."
};
const getGreetingText = (name = "Друг") => {
    return `👋 Привет, ${name}!\n\n` +
        'Я тестовый бот для проверки функционала.\n' +
        'Используй /help для списка команд.';
};
exports.getGreetingText = getGreetingText;
const getHelpText = () => {
    return constants_1.textCommands
        .map(command => `${command.name} - ${command.text}`)
        .join(',\n');
};
exports.getHelpText = getHelpText;
