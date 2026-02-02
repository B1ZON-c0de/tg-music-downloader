"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.downloadMusic = void 0;
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
const sanitize_file_name_1 = require("../utils/sanitize-file-name");
const download_track_progressive_1 = require("./download-track-progressive");
const download_track_hls_1 = require("./download-track-hls");
const downloadMusic = (track, pathToMusic) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs.existsSync(pathToMusic)) {
        fs.mkdirSync(pathToMusic, { recursive: true });
    }
    const cachedFilepath = path.resolve(pathToMusic, (0, sanitize_file_name_1.sanitizeFilename)(track.title) + ".mp3");
    if (fs.existsSync(cachedFilepath)) {
        return cachedFilepath;
    }
    const progressive = track.media.transcodings.find((t) => t.format.protocol === "progressive");
    if (progressive) {
        return yield (0, download_track_progressive_1.downloadTrackProgressive)(track, progressive, pathToMusic);
    }
    else {
        const hls = track.media.transcodings.find((t) => t.format.protocol === "hls");
        return yield (0, download_track_hls_1.downloadTrackHls)(track, hls, pathToMusic);
        // throw new Error("No progressive stream");
    }
});
exports.downloadMusic = downloadMusic;
