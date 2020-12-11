require('dotenv').config();
import fetch from 'node-fetch';
const API_KEY = process.env.API_KEY;
const URL_ASTEROIDS = 'https://api.nasa.gov/neo/rest/v1';

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

export async function AsteroidsFeed(startDate: string, endDate: string) {
    // Recibir fecha desde el cliente
    return await fetch(`${URL_ASTEROIDS}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`, {
            method: 'GET',
        }).then(res => res.json());
}

function getMonth(date: Date) {
    let month = date.getMonth() + 1; 
    return month < 10 ? `0${month}` : month;
}

function getDay(date: Date) {
    let day = date.getDate();
    return day < 10 ? `0${day}` : day;
}

export async function AsteroidNearToday() {
    let date =  new Date();
    return await fetch(`${URL_ASTEROIDS}/feed?start_date=${date.getFullYear()}-${getMonth(date)}-${getDay(date)}&end_date=${date.getFullYear()}-${getMonth(date)}-${getDay(date)}&api_key=${API_KEY}`, {
            method: 'GET'
        }).then(res => res.json());
}

export async function AsteroidsBrowse(){
    return await fetch(`${URL_ASTEROIDS}/neo/browse?api_key=${API_KEY}`, {
        method: 'GET',
    }).then(res => res.json());
}

