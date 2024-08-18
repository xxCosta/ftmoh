import {Elysia, t} from 'elysia'
import {} from './types'

//discord websocker url
let dws:string

try{

    const headerInfo = {
        "Authorization": `Bot ${Bun.env.TOKEN}`
    }

    const headers = new Headers(headerInfo)

    const response = await fetch("https://discord.com/api/gateway/bot", {
        headers: headers
    })
    const result = await response.json()
    dws = result.url 

}catch (e){
    console.log(e)
}

const server = new Elysia()
    .get('/', () => 'was poppin')
    .listen(3000)

console.log(`server ready on port ${server.server!.url.port}`)







