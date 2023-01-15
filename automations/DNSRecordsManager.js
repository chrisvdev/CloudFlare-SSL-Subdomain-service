import * as dotenv from 'dotenv'
import fs from 'fs'
import getPublicIP from '../APIs/publicIP'

dotenv.config()
const serverName = process.env.SERVER_NAME
const currentIP = await getPublicIP()
const domains = JSON.stringify(fs.readFileSync('../domains.json', 'utf8'))