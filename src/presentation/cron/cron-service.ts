import { CronJob } from 'cron';

type Crontime = string | Date;
type OnTick = () => void;


export class CronService {


    static createJob(cronTime: Crontime, onTick: OnTick) {
        const job = new CronJob(cronTime, onTick);

        job.start();

        return job;
    }

}