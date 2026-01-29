"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFilename = void 0;
const sanitizeFilename = (filename) => {
    return filename
        .replace(/[<>:"/\\|?*—]/g, "") // Удаляем запрещенные символы
        .replace(/\s+/g, "_") // Заменяем пробелы на подчеркивания
        .replace(/[^\w\-_.]/g, "") // Оставляем только буквы, цифры, подчеркивания, точки, дефисы
        .trim()
        .slice(0, 100); // Ограничиваем длину
};
exports.sanitizeFilename = sanitizeFilename;
