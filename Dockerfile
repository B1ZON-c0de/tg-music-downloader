# Используем официальный Node.js образ
FROM node:20-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --production

# Копируем весь код
COPY . .

# Собираем TypeScript
RUN npx tsc

# Устанавливаем переменные окружения
# Лучше передавать через docker run --env-file .env

# Запускаем бота
CMD ["node", "dist/index.js"]