import fetch from 'node-fetch';

const URL_SPACEX = 'https://api.spacexdata.com/v3';

// All events, misions rockets and launches

export async function allHistoricEvents() {
    return await fetch(`${URL_SPACEX}/history`,{
            method: 'GET'
        }).then(res => res.json());
}

export async function allMisions() {
    return await fetch(`${URL_SPACEX}/missions`, {
            method: 'GET'
        }).then(res => res.json());
}

export async function allLaunches() {
    return await fetch(`${URL_SPACEX}/launches`,{
            method: 'GET'
        }).then(res => res.json());
}

export async function allRockets() {
    return await fetch(`${URL_SPACEX}/rockets`, {
            method: 'GET'
        }).then(res => res.json());
}

// Specefic event, rocket, launch and missions

export async function oneHistoricEvent(id: number) {
    return await fetch(`${URL_SPACEX}/history/${id}`,{
            method: 'GET'
        }).then(res => res.json());
}

export async function oneMision(missionId: string) {
    return await fetch(`${URL_SPACEX}/missions/${missionId}`, {
            method: 'GET'
        }).then(res => res.json());
}

export async function oneLaunch(flightNumber: number) {
    return await fetch(`${URL_SPACEX}/launches/${flightNumber}`,{
            method: 'GET'
        }).then(res => res.json());
}

export async function oneRocket(rocketId: string) {
    return await fetch(`${URL_SPACEX}/rockets/${rocketId}`, {
            method: 'GET'
        }).then(res => res.json());
}

export async function latestLaunch() {
    return await fetch(`${URL_SPACEX}/launches/latest`,{
            method: 'GET'
        }).then(res => res.json());
}

export async function nextLaunch() {
    return await fetch(`${URL_SPACEX}/launches/next`,{
            method: 'GET'
        }).then(res => res.json());
}

export async function pastLaunch() {
    return await fetch(`${URL_SPACEX}/launches/past`,{
            method: 'GET'
        }).then(res => res.json());
}