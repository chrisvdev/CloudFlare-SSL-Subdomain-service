class CronJob {
  constructor (cronTime) {
    this.cronTime = cronTime
    this.jobs = []
    this.executeJobs = setInterval(() => {
      this.jobs.forEach(cb => cb())
    }, this.cronTime)
  }

  use (cb) {
    this.jobs.push(cb)
  }
}

export default CronJob
