require('dotenv').config();
import fetch from 'node-fetch';
const API_KEY = process.env.API_KEY;


export async function searchImagesAndVideos(query: string) {

    let queryParam = query.toLocaleLowerCase();
    
    return await fetch(`https://images-api.nasa.gov/search?q=${queryParam}`, {
            method: 'GET',
        }).then(res => res.json());
}

export async function ApodOfToday() {
    return await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&hd=true`, {
            method: 'GET',
        }).then(res => res.json());
}

 export async function AsteroidsFeed() {

    // Recibir fecha desde el cliente
    return await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2016-07-14&end_date=2016-07-21&api_key=${API_KEY}`, {
            method: 'GET',
        }).then(res => res.json());
}

export async function AsteroidsBrowse(){
    return await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`, {
        method: 'GET',
    }).then(res => res.json());
}

