import { Database } from "bun:sqlite"
import {Elysia, t} from 'elysia'
// import { io } from 'socket.io-client'
import {} from './types'
import WebSocket from "ws";
import { DiscordWs } from "./discord";

//THIS FILE WILL BE THE ENTRYPOINT TO THE CLI
//THE CLI WILL BE RESPONSIBLE FOR CRUD OF COMMANDS AND OVERALL ADMIN
//NO LOGIC SHOULD GO IN HERE UNLESS IT'S CLI RELATED



const server = new Elysia()
    .get('/', () => 'was poppin')
    .listen(3000)

console.log(`server ready on port ${server.server!.url.port}`)







