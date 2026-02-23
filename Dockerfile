# ===== Build stage =====
FROM node:20 AS builder

WORKDIR /app

# Установка ffmpeg (нужен для аудио стриминга)
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Копируем зависимости
COPY package*.json ./
COPY tsconfig.json ./

# Устанавливаем зависимости (убедиcь, что в package.json нет link:)
RUN npm install

# Копируем исходники
COPY src ./src

# Компилируем TypeScript
RUN npm run build


# ===== Production stage =====
FROM node:20-slim

WORKDIR /app

# Копируем только build результат
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Запуск бота
CMD ["node", "dist/index.js"]