import express from 'express'
import vhost from 'vhost'
import proxy from 'express-http-proxy'

export default function getHTTPServer (domains) {
  const server = express()
  domains.forEach(domain => {
    const [method, location] = domain.to.split(':')
    server.use(vhost(domain.name, method === 'local' ? express.static(location) : proxy(domain.to)))
  })
  return server
}
