/* eslint-disable indent */

import { readFileSync, watchFile } from 'fs'

class LoadConfig {
    constructor (path, toExecute, parser) {
        this.parser = parser
        this.path = path
        this.toExecute = toExecute
        this.loadFile()
        this.execute()
        watchFile(this.path, () => {
            this.loadFile()
            this.execute()
        })
    }

    loadFile () {
        this.file = readFileSync(this.path, 'utf-8')
    }

    execute () {
        this.toExecute(this.parser ? this.parser(JSON.parse(this.file)) : JSON.parse(this.file))
    }
}

export default LoadConfig
