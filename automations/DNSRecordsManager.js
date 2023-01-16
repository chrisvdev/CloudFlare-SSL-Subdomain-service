import * as dotenv from 'dotenv'
import fs from 'fs'
import getPublicIP from '../APIs/publicIP.js'

dotenv.config()
const currentIP = await getPublicIP()
const domains = JSON.parse(fs.readFileSync('./domains.json', 'utf8'))
let SERVER_NAME
let cloudflare
let oldRecords

async function makeDNSRecords () {
  return domains.map((domain) => {
    const record = {
      type: 'A',
      content: currentIP,
      name: domain.name,
      comment: `${SERVER_NAME}: ${domain.comment}`,
      proxied: true,
      ttl: 1
    }
    const oldRecord = oldRecords.find((oldRecord) => oldRecord.name === record.name)
    oldRecord && (record.id = oldRecord.id)
    return record
  })
}

async function recordsToUpdate () {
  return (await makeDNSRecords()).map((record) =>
    (record.id
      ? cloudflare.updateDNSRecord({
        type: record.type,
        content: record.content,
        name: record.name,
        comment: record.comment,
        proxied: record.proxied,
        ttl: record.ttl
      }, record.id)
      : cloudflare.createDNSRecord(record)
    ))
}

function recordsToDelete () {
  const records = oldRecords.filter((oldRecord) => (!domains.find((domain) => domain.name === oldRecord.name)))
  return records.map((record) => cloudflare.deleteDNSRecord(record.id))
}

export default async function updateDNSRecords (instanceOfCloudflareAPI, serverName) {
  SERVER_NAME = serverName
  cloudflare = instanceOfCloudflareAPI
  oldRecords = (await cloudflare.getDNSRecords('A')).filter((record) => record.comment.split(':')[0] === SERVER_NAME)
  return {
    domains,
    log: await Promise.allSettled([...await recordsToUpdate(), ...recordsToDelete()])
  }
}
