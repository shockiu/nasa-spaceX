"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronJobAstBrowse = exports.cronJobAstNear = exports.cronJobApod = void 0;
var cron_1 = __importDefault(require("cron"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var nasa_1 = require("../nasa-endpoints/nasa");
var URL_BD_SPACE = 'https://space-bubble-default-rtdb.firebaseio.com/nasa';
exports.cronJobApod = new cron_1.default.CronJob('00 00 00 * * 0-6', function () {
    nasa_1.ApodOfToday().then(function (res) {
        node_fetch_1.default(URL_BD_SPACE + "/apodoftoday.json", {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(function () { return console.log('Apod completado, insertado en la BD'); });
    });
}, null, false, 'America/Caracas');
exports.cronJobAstNear = new cron_1.default.CronJob('00 00 23 * * 0-6', function () {
    nasa_1.AsteroidNearToday().then(function (res) {
        node_fetch_1.default(URL_BD_SPACE + "/asteroidnear.json", {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(function () { return console.log('Asteroides cerca completado, insertado en la BD'); });
    });
}, null, false, 'America/Caracas');
exports.cronJobAstBrowse = new cron_1.default.CronJob('00 00 22 * * 0-6', function () {
    nasa_1.AsteroidsBrowse().then(function (res) {
        node_fetch_1.default(URL_BD_SPACE + "/asteroidbrowse.json", {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(function () { return console.log('Asteroides browse crompletado, insertado en la BD'); });
    });
}, null, false, 'America/Caracas');
