"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGreetingText = void 0;
const getGreetingText = (name = "Друг") => {
    return `👋 Привет, ${name}!\n\n` +
        'Я тестовый бот для проверки функционала.\n' +
        'Используй /help для списка команд.';
};
exports.getGreetingText = getGreetingText;
