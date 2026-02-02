"use strict";
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
exports.downloadTrackProgressive = void 0;
const axios_1 = __importDefault(require("axios"));
const node_path_1 = __importDefault(require("node:path"));
const sanitize_file_name_1 = require("../utils/sanitize-file-name");
const node_fs_1 = __importDefault(require("node:fs"));
const config_1 = require("../config/config");
const downloadTrackProgressive = (track, progressiveTranscoding, pathToMusic) => __awaiter(void 0, void 0, void 0, function* () {
    const CLIENT_ID = (0, config_1.getClientId)();
    const { data } = yield axios_1.default.get(progressiveTranscoding.url, {
        params: {
            client_id: CLIENT_ID,
            track_authorization: track.track_authorization,
        },
    });
    const response = yield axios_1.default.get(data.url, { responseType: "stream" });
    const filePath = node_path_1.default.resolve(pathToMusic, `${(0, sanitize_file_name_1.sanitizeFilename)(track.title)}.mp3`);
    const writer = node_fs_1.default.createWriteStream(filePath);
    response.data.pipe(writer);
    yield new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
    return filePath;
});
exports.downloadTrackProgressive = downloadTrackProgressive;
