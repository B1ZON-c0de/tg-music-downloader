"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFilename = void 0;
const sanitizeFilename = (filename) => {
    return filename
        .replace(/[<>:"/\\|?*]/g, "")
        .replace(/\s+/g, "_")
        .trim()
        .slice(0, 100);
};
exports.sanitizeFilename = sanitizeFilename;
