require('dotenv').config();
const express = require('express');
const cors = require('cors');
import { searchImagesAndVideos, AsteroidsFeed } from './nasa-endpoints/nasa';
import {  allHistoricEvents, 
          allLaunches, 
          allMisions, 
          allRockets, 
          latestLaunch, 
          nextLaunch, 
          oneHistoricEvent, 
          oneLaunch, 
          oneMision, 
          oneRocket, 
          pastLaunch} from './spaceX-endpoints/spaceX';
import { cronJobApod, cronJobAstBrowse, cronJobAstNear } from './jobs/jobs.nasa';
const app =  express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server runing port: ${PORT}`);
});

app.use(cors());

/*
app.use(function(req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/

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
    AsteroidsFeed(startDate, endDate).then(resp => {
        res.status(200).send(resp);
    });
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

// Specific event

app.get('/historic-spaceX/:id', (req: any, res: any) => {
    const { id } = req.params;
    oneHistoricEvent( id ).then(resp => res.send(resp) );
});

app.get('/missions-spaceX/:missionId', (req: any, res: any) => {
    const { missionId } = req.params;
    oneMision(missionId).then( resp => res.send(resp) );
});

app.get('/launches-spaceX/:flightNumber', (req: any, res: any) => {
    const { flightNumber } = req.params;
    oneLaunch(flightNumber).then(resp => res.send(resp) );
});

app.get('/rockets-spaceX/:rocketId', (req: any, res: any) => {
    const { rocketId } = req.params;
    oneRocket(rocketId).then( resp => res.send(resp) );
});

app.get('/launches-spaceX/:type', (req: any, res: any) => {
    const { type } = req.params;

    if( type === 'latest' ) {
        latestLaunch().then(resp => res.send(resp) );
    } else if ( type === 'next' ) {
        nextLaunch().then( resp => res.send(resp) );
    } else {
        pastLaunch().then(resp => res.send(resp));
    }
});