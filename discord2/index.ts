import { Database } from "bun:sqlite"
import {Elysia, t} from 'elysia'
// import { io } from 'socket.io-client'
import {} from './types'
import WebSocket from "ws";
import { Discord } from "./discord";

const discord = new Discord(Bun.env.TOKEN)


// const ws = new WebSocket(dwsURL) 
// ws.on('error', console.error)
//
// ws.on("open", ()=>{
//     console.log("open connection")
// })
//
// ws.addEventListener('message', (d)=>{
//     console.log(JSON.parse(d.data))
// })

const server = new Elysia()
    .get('/', () => 'was poppin')
    .listen(3000)

console.log(`server ready on port ${server.server!.url.port}`)







