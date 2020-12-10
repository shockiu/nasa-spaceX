require('dotenv').config();
const express = require('express');
import * as cron from 'cron';
import { searchImagesAndVideos } from './nasa-endpoints/nasa';
import { allHistoricEvents, allLaunches, allMisions, allRockets } from './spaceX-endpoints/spaceX';
import { cronJobApod, cronJobAstBrowse, cronJobAstNear } from './jobs/jobs.nasa';
const app =  express();
const PORT = process.env.PORT || 3000;
const cronJob = cron.CronJob;

let job = new cronJob('0 */2 * * * *', () => {
});

// job.start();

app.listen(PORT, () => {
    console.log(`Server runing port: ${PORT}`);
});

// JOBS NASA
cronJobApod.start();
cronJobAstBrowse.start();
cronJobAstNear.start();

// Nasa endpoints

app.get('/search-media-nasa/:q', ( req: any, res: any ) => {
    let queryParam = req.params.q;
    searchImagesAndVideos(queryParam).then(resp => res.send(resp));
});

app.get('/apod-today-nasa', ( req:any, res:any ) => {
   //  ApodOfToday().then(resp => res.status(200).send(resp));
    
});

app.get('/asteroid-feed-nasa/:startDate/:endDate', ( req:any, res:any ) => {
    let {startDate, endDate} = req.params;
    res.status(200).send('Ok');
});

app.get('/asteroid-browse-nasa', ( req:any, res:any ) => {
    res.status(200).send('Todo ok');
});


// SpaceX endpoints


app.get('/historic-spaceX', (req: any, res: any) => {
    allHistoricEvents().then(resp => res.send(resp));
});

app.get('/missions-spaceX', (req: any, res: any) => {
    allMisions().then(resp => res.send(resp));
});

app.get('/launches-spaceX', (req: any, res: any) => {
    allLaunches().then(resp => res.send(resp));
});

app.get('/rockets-spaceX', (req: any, res: any) => {
    allRockets().then(resp => res.send(resp));
});