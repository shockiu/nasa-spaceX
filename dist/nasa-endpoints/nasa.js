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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidsBrowse = exports.AsteroidNearToday = exports.AsteroidsFeed = exports.ApodOfToday = exports.searchImagesAndVideos = void 0;
require('dotenv').config();
var node_fetch_1 = __importDefault(require("node-fetch"));
var API_KEY = process.env.API_KEY;
var URL_ASTEROIDS = 'https://api.nasa.gov/neo/rest/v1';
function searchImagesAndVideos(query) {
    return __awaiter(this, void 0, void 0, function () {
        var queryParam;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryParam = query.toLocaleLowerCase();
                    return [4 /*yield*/, node_fetch_1.default("https://images-api.nasa.gov/search?q=" + queryParam, {
                            method: 'GET',
                        }).then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.searchImagesAndVideos = searchImagesAndVideos;
function ApodOfToday() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default("https://api.nasa.gov/planetary/apod?api_key=" + API_KEY + "&hd=true", {
                        method: 'GET',
                    }).then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ApodOfToday = ApodOfToday;
function AsteroidsFeed(startDate, endDate) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(URL_ASTEROIDS + "/feed?start_date=" + startDate + "&end_date=" + endDate + "&api_key=" + API_KEY, {
                        method: 'GET',
                    }).then(function (res) { return res.json(); })];
                case 1: 
                // Recibir fecha desde el cliente
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.AsteroidsFeed = AsteroidsFeed;
function getMonth(date) {
    var month = date.getMonth() + 1;
    return month < 10 ? "0" + month : month;
}
function getDay(date) {
    var day = date.getDate();
    return day < 10 ? "0" + day : day;
}
function AsteroidNearToday() {
    return __awaiter(this, void 0, void 0, function () {
        var date;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date();
                    return [4 /*yield*/, node_fetch_1.default(URL_ASTEROIDS + "/feed?start_date=" + date.getFullYear() + "-" + getMonth(date) + "-" + getDay(date) + "&end_date=" + date.getFullYear() + "-" + getMonth(date) + "-" + getDay(date) + "&api_key=" + API_KEY, {
                            method: 'GET'
                        }).then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.AsteroidNearToday = AsteroidNearToday;
function AsteroidsBrowse() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, node_fetch_1.default(URL_ASTEROIDS + "/neo/browse?api_key=" + API_KEY, {
                        method: 'GET',
                    }).then(function (res) { return res.json(); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.AsteroidsBrowse = AsteroidsBrowse;
