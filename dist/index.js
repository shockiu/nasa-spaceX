"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require('express');
var cron_1 = __importDefault(require("cron"));
var nasa_1 = require("./nasa-endpoints/nasa");
var spaceX_1 = require("./spaceX-endpoints/spaceX");
var jobs_nasa_1 = require("./jobs/jobs.nasa");
var app = express();
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server runing port: " + PORT);
});
// job prueba 
var job = new cron_1.default.CronJob('* */2 * * * *', function () {
    console.log('prueba de trabajo corriendo');
});
job.start();
// JOBS NASA
jobs_nasa_1.cronJobApod.start();
jobs_nasa_1.cronJobAstBrowse.start();
jobs_nasa_1.cronJobAstNear.start();
// Nasa endpoints
app.get('/search-media-nasa/:q', function (req, res) {
    var queryParam = req.params.q;
    nasa_1.searchImagesAndVideos(queryParam).then(function (resp) { return res.send(resp); });
});
app.get('/apod-today-nasa', function (req, res) {
    //  ApodOfToday().then(resp => res.status(200).send(resp));
});
app.get('/asteroid-feed-nasa/:startDate/:endDate', function (req, res) {
    var _a = req.params, startDate = _a.startDate, endDate = _a.endDate;
    nasa_1.AsteroidsFeed(startDate, endDate).then(function (resp) {
        res.status(200).send(resp);
    });
});
app.get('/asteroid-browse-nasa', function (req, res) {
    res.status(200).send('Todo ok');
});
// SpaceX endpoints
app.get('/historic-spaceX', function (req, res) {
    spaceX_1.allHistoricEvents().then(function (resp) { return res.send(resp); });
});
app.get('/missions-spaceX', function (req, res) {
    spaceX_1.allMisions().then(function (resp) { return res.send(resp); });
});
app.get('/launches-spaceX', function (req, res) {
    spaceX_1.allLaunches().then(function (resp) { return res.send(resp); });
});
app.get('/rockets-spaceX', function (req, res) {
    spaceX_1.allRockets().then(function (resp) { return res.send(resp); });
});
// Specific event
app.get('/historic-spaceX/:id', function (req, res) {
    var id = req.params.id;
    spaceX_1.oneHistoricEvent(id).then(function (resp) { return res.send(resp); });
});
app.get('/missions-spaceX/:missionId', function (req, res) {
    var missionId = req.params.missionId;
    spaceX_1.oneMision(missionId).then(function (resp) { return res.send(resp); });
});
app.get('/launches-spaceX/:flightNumber', function (req, res) {
    var flightNumber = req.params.flightNumber;
    spaceX_1.oneLaunch(flightNumber).then(function (resp) { return res.send(resp); });
});
app.get('/rockets-spaceX/:rocketId', function (req, res) {
    var rocketId = req.params.rocketId;
    spaceX_1.oneRocket(rocketId).then(function (resp) { return res.send(resp); });
});
app.get('/launches-spaceX/:type', function (req, res) {
    var type = req.params.type;
    if (type === 'latest') {
        spaceX_1.latestLaunch().then(function (resp) { return res.send(resp); });
    }
    else if (type === 'next') {
        spaceX_1.nextLaunch().then(function (resp) { return res.send(resp); });
    }
    else {
        spaceX_1.pastLaunch().then(function (resp) { return res.send(resp); });
    }
});
