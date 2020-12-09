require('dotenv').config();
const express = require('express');
import * as cron from 'cron';
import { searchImagesAndVideos, ApodOfToday, AsteroidsBrowse, AsteroidsFeed } from './nasa-endpoints/nasa';

// import fetch from 'node-fetch';

const app =  express();
const PORT = process.env.PORT || 3000;



const cronJob = cron.CronJob;

let job = new cronJob('0 */2 * * * *', ()=>{
    console.log(`Job corriendo cada dos minutos ${new Date()}`)
});

job.start();



app.listen(PORT, () => {
    console.log(`Server runing port: ${PORT}`);
});

app.get('/', (req: any, res: any) => {

    let queryParam;
    // Tomar el parametro por la url
    console.log(req);

    searchImagesAndVideos('moon').then(resp => res.send(resp));
});


