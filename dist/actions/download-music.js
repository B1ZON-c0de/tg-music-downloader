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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadMusic = void 0;
const axios_1 = __importDefault(require("axios"));
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
const config_1 = require("../config/config");
const pathToMusic = path.join(__dirname, "..", "..", "music");
const CLIENT_ID = (0, config_1.getClientId)();
const downloadMusic = (track) => __awaiter(void 0, void 0, void 0, function* () {
    const progressive = track.media.transcodings.find((t) => t.format.protocol === "progressive");
    if (!progressive)
        throw new Error("No progressive stream");
    const { data } = yield axios_1.default.get(progressive.url, {
        params: {
            client_id: CLIENT_ID,
            track_authorization: track.track_authorization,
        },
    });
    const response = yield axios_1.default.get(data.url, { responseType: "stream" });
    const filePath = path.resolve(pathToMusic, `${track.title.replace(/ /g, "_")}.mp3`);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    yield new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
    return filePath;
});
exports.downloadMusic = downloadMusic;
