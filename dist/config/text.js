"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHelpText = exports.getGreetingText = void 0;
const constants_1 = require("./constants");
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
