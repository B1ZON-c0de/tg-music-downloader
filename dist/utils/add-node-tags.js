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
exports.addNodeTags = void 0;
const get_image_track_1 = require("../actions/get-image-track");
const node_id3_1 = __importDefault(require("node-id3"));
const addNodeTags = (track, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const trackTitle = track.title;
    const trackArtistUsername = track.user.username;
    const tags = Object.assign({ title: trackTitle, artist: trackArtistUsername }, ((yield (0, get_image_track_1.getImageTrack)(track)) ? { APIC: yield (0, get_image_track_1.getImageTrack)(track) } : {}));
    node_id3_1.default.update(tags, filePath);
});
exports.addNodeTags = addNodeTags;
