import Express from "express";
import logger from "morgan";

import { Server } from "socket.io";
import { createServer } from "node:http"

const port = process.env.PORT ?? 3000


const app = Express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? "https://real-time-chat-production-2aff.up.railway.app" : "http://localhost:5173"
    }
})

io.on('connection', (socket) => {
    console.log("Hola mundo")

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    socket.on("new message", (message) => {
        socket.broadcast.emit("new message", message)
    })
})

app.use(logger('dev'))
app.get('/', (req, res) => {
    res.send('<h1>Esto es el chat</h1>')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})