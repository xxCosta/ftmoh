import { Database } from "bun:sqlite"
import {Elysia, t} from 'elysia'
// import { io } from 'socket.io-client'
import {} from './types'
import WebSocket from "ws";


const db = new Database("discord-db.sqlite");

const dwsQuery = db.query("SELECT * FROM cache WHERE key='dws'").get()
let dwsURL:string = dwsQuery.value
try{

    const headerInfo = {
        "Authorization": `Bot ${Bun.env.TOKEN}`
    }

    const headers = new Headers(headerInfo)

    const response = await fetch("https://discord.com/api/gateway/bot", {
        headers: headers
    })
    const result = await response.json()
    const check = db.query("SELECT * FROM cache WHERE key='dws'").all()
    if (check.length === 0){
        db.query(`INSERT INTO cache(key,value,expiry) VALUES ('dws',"${result.url}",3000)`).run()
    }

}catch (e){
    console.log(e)
}



const ws = new WebSocket(dwsURL) 
ws.on('error', console.error)

ws.on("open", ()=>{
    console.log("open connection")
})

ws.addEventListener('message', (d)=>{
    console.log(JSON.parse(d.data))
})

const server = new Elysia()
    .get('/', () => 'was poppin')
    .listen(3000)

console.log(`server ready on port ${server.server!.url.port}`)







