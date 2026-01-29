"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTracks = void 0;
const mapTracks = (tracks) => {
    return tracks.map((track, index) => `${index + 1}. ${track.user.username} - ${track.title}`).join("\n");
};
exports.mapTracks = mapTracks;
