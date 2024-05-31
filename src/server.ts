import { Express } from 'express'
import http from 'http'

class Server {
  constructor(private readonly app: Express) {}
  start = (port: number) => {
    const server = http.createServer(this.app).listen(port, () => {
      console.log(`Server is running on port: ${port}, PID: ${process.pid}`)
    })

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received.')
      server.close(() => {
        console.log('Http server closed.')
        process.exit(0)
      })
    })

    process.on('SIGINT', () => {
      console.log('SIGINT signal received.')
      server.close(() => {
        console.log('Http server closed.')
        process.exit(0)
      })
    })
  }
}

export default Server
