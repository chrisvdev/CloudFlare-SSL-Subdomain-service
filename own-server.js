import * as dotenv from 'dotenv'
import express from 'express'
import https from 'https'
import fs from 'fs'

dotenv.config()
const PORT = parseInt(process.env.PORT)
const server = express()
server.use('/', express.static('./web/'))
const cert = fs.readFileSync('./ssl/certificate.crt', 'utf8')
const key = fs.readFileSync('./ssl/private.key', 'utf8')
const credentials = { cert, key }
const sslServer = https.createServer(credentials, server)
sslServer.listen(PORT, () => { console.log(`HTTPS Server listening on port ${PORT}`) })
