import path from 'path'
import fs from 'fs'

import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import boom from '@hapi/boom'
import cors from 'cors'

const server = express()
const filename = path.join(__dirname, 'dvh.json')

server.use(morgan('tiny'))
server.use(compression())
server.use(cors())

server.get('/dvh', (req, res) => {
  fs.readFile(filename, { encoding: 'utf8' }, (err, json) => {
    if (err) {
      return res.status(500).json(boom.badImplementation(`Can't read ${filename}`))
    }

    res.json(JSON.parse(json))
  })
})
server.use((req, res) => {
  res.status(404).json(boom.notFound().output.payload)
})

export { server }
