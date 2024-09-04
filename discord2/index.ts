import { Database } from "bun:sqlite"
import {Elysia, t} from 'elysia'
// import { io } from 'socket.io-client'
import {} from './types'
import WebSocket from "ws";
import { DiscordWs } from "./discord";

const discord = new DiscordWs(Bun.env.TOKEN)



const server = new Elysia()
    .get('/', () => 'was poppin')
    .listen(3000)

console.log(`server ready on port ${server.server!.url.port}`)







