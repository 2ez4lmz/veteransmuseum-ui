# Используем Node
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Копируем весь проект
COPY . .

# Открываем порт, который использует Vite
EXPOSE 5173

# Запуск dev-сервера
CMD ["npm", "run", "dev", "--", "--host"]
