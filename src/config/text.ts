import { textCommands } from "./constants";

export const getGreetingText = (name = "Друг") => {
  return `👋 Привет, ${ name }!\n\n` +
    'Я тестовый бот для проверки функционала.\n' +
    'Используй /help для списка команд.'
}

export const getHelpText = () => {
  return textCommands
    .map(command => `${ command.name } - ${ command.text }`)
    .join(',\n')
}
