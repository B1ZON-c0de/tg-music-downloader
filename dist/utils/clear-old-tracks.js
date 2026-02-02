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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanOldTracks = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const config_1 = require("../config/config");
const cleanOldTracks = (pathname) => {
    const MAX_TRACKS = (0, config_1.getMaxTracks)();
    const files = fs.readdirSync(pathname)
        .map(file => ({
        name: file,
        time: fs.statSync(path.join(pathname, file)).mtime.getTime(),
    }))
        .sort((a, b) => a.time - b.time);
    while (files.length > MAX_TRACKS) {
        const oldestTrack = files.shift();
        if (oldestTrack)
            fs.unlinkSync(path.join(pathname, oldestTrack.name));
    }
};
exports.cleanOldTracks = cleanOldTracks;
