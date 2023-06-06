import LoadConfig from './lib/load_config.js'
import CronJob from './lib/cron_job.js'

const config = new LoadConfig('./domains.json', (config) => { console.log(config) })
const cronJob = new CronJob(1000)

cronJob.use(() => { console.log('Tarea 1') })
cronJob.use(() => { console.log('Tarea 2') })
cronJob.use(() => { console.log('Tarea 3') })
