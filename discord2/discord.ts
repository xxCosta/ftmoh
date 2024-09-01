import WebSocket from "ws";
import { Database } from "bun:sqlite"

interface wsEvent{
    op: number,
    d: object|number,
    t?: string|null,
    s?: number|null
}




export class Discord {
    wsUrl:string
    constructor(token:string){
        this.#init(token)
    }

    async #init( token:string ) {
                
        const db = new Database("discord-db.sqlite");


        try {

            const headerInfo = {
                "Authorization": token
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
            
            const dwsQuery = db.query("SELECT * FROM cache WHERE key='dws'").get()

            this.wsUrl = dwsQuery.value
            this.#initDb()
        }catch (e) {
            console.log(e)
        }
    }

   async #initDb(){

        const ws = new WebSocket(this.wsUrl) 
        ws.on('error', console.error)

        ws.on("open", ()=>{
            console.log("open connection")
        })

        ws.addEventListener('message', (d)=>{
            const event = JSON.parse(d.data)

            const interval = Math.ceil(41250*Math.random())

            if (event.op === 10){
                const e:wsEvent = {
                    op: 1,
                    d: interval
                } 
            const sendEvent = () => ws.send(JSON.stringify(e))
            const heartbeat = setInterval(sendEvent,interval)
            } 
        })
        let heartbeatCounter = 0
        ws.addEventListener('message', (d)=>{
            const event = JSON.parse(d.data)
            if (event.op === 11){
                if ( heartbeatCounter === 0 ){
                    console.log("(♥_♥)")
                    ++heartbeatCounter
                } else {
                    ++heartbeatCounter
                    heartbeatCounter === 10 
                        ?heartbeatCounter = 0
                        :console.log("<3")
                }
            }
        })
    }
    
}
