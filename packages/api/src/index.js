import { server } from './server'

const port = process.argv[2] || 3010
const host = process.argv[3] || 'localhost'

server.listen(port, host, () => {
  console.log(`DVH API running at http://${host}:${port}`)
})
