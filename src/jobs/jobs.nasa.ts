import cron from 'cron';
import fetch from 'node-fetch';
import { ApodOfToday, AsteroidNearToday, AsteroidsBrowse } from '../nasa-endpoints/nasa';

const URL_BD_SPACE = 'https://space-bubble-default-rtdb.firebaseio.com/nasa';

export const cronJobApod = new cron.CronJob('0 */2 * * * *', ()=> {
    ApodOfToday().then(res => {
        fetch(`${URL_BD_SPACE}/apodoftoday.json`, {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(()=> console.log('Apod completado'));
    });
});

export const cronJobAstNear = new cron.CronJob('0 */3 * * * *', ()=> {
    AsteroidNearToday().then(res => {
        fetch(`${URL_BD_SPACE}/asteroidnear.json`, {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(() => console.log('Asteroides cerca completado'));
    });
});

export const cronJobAstBrowse = new cron.CronJob('0 */4 * * * *', () => {
    AsteroidsBrowse().then(res => {
        fetch(`${URL_BD_SPACE}/asteroidbrowse.json`, {
            method: 'PUT',
            body: JSON.stringify(res)
        }).finally(() => console.log('Asteroides browse crompletado'));
    });
});

