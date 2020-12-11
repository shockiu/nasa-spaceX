import cron from 'cron';
import fetch from 'node-fetch';
import { ApodOfToday, AsteroidNearToday, AsteroidsBrowse } from '../nasa-endpoints/nasa';

const URL_BD_SPACE = 'https://space-bubble-default-rtdb.firebaseio.com/nasa';

export const cronJobApod = new cron.CronJob('00 00 00 * * 0-6', ()=> {
    ApodOfToday().then(res => {
        fetch(`${URL_BD_SPACE}/apodoftoday.json`, {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(()=> console.log('Apod completado, insertado en la BD'));
    });
}, null, false, 'America/Caracas');

export const cronJobAstNear = new cron.CronJob('00 00 23 * * 0-6', ()=> {
    AsteroidNearToday().then(res => {
        fetch(`${URL_BD_SPACE}/asteroidnear.json`, {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(() => console.log('Asteroides cerca completado, insertado en la BD'));
    });
}, null, false, 'America/Caracas');

export const cronJobAstBrowse = new cron.CronJob('00 00 22 * * 0-6', () => {
    AsteroidsBrowse().then(res => {
        fetch(`${URL_BD_SPACE}/asteroidbrowse.json`, {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(() => console.log('Asteroides browse crompletado, insertado en la BD'));
    });
}, null, false, 'America/Caracas');

