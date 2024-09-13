import {Elysia} from 'elysia'
import { DiscordWs } from "./discordWS";
import DiscordHttp from './discordHTTP';

const discordWs = new DiscordWs(Bun.env.TOKEN)
const discordHTTP = new DiscordHttp()

const server = new Elysia()
    .get('/', () => 'was poppin')
    .listen(3000)

console.log(`server ready on port ${server.server!.url.port}`)







