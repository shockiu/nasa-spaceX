import fetch from 'node-fetch';


// All events, misions rockets and launches

export async function allHistoricEvents() {
    return await fetch('https://api.spacexdata.com/v3/history',{
            method: 'GET'
        }).then(res => res.json());
}

export async function allMisions() {
    return await fetch('https://api.spacexdata.com/v3/missions', {
            method: 'GET'
        }).then(res => res.json());
    }

export async function allLaunches() {
    return await fetch('https://api.spacexdata.com/v3/launches',{
            method: 'GET'
        }).then(res => res.json());
}

export async function allRockets() {
    return await fetch('https://api.spacexdata.com/v3/rockets', {
            method: 'GET'
        }).then(res => res.json());
}

// Specefic event, rocket, launch and missions