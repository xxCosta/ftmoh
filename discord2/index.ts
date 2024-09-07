import {Elysia, t} from 'elysia'
import {} from './types'
import { DiscordWs } from "./discordWS";
import DiscordHttp from './discordHTTP';

//THIS FILE WILL BE THE ENTRYPOINT TO THE CLI
//THE CLI WILL BE RESPONSIBLE FOR CRUD OF COMMANDS AND OVERALL ADMIN
//NO LOGIC SHOULD GO IN HERE UNLESS IT'S CLI RELATED

const discordWs = new DiscordWs(Bun.env.TOKEN)
const discordHTTP = new DiscordHttp()


const server = new Elysia()
    .get('/', () => 'was poppin')
    .listen(3000)

console.log(`server ready on port ${server.server!.url.port}`)







