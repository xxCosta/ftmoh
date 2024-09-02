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
    #token:string
    identified:boolean = false

    constructor(token:string){
        this.#initDb(token)
        this.#token = token
    }

    async #initDb( token:string ) {
                
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
            this.#initWs()
        } catch (e) {
            console.log(e)
        }
    }

   async #initWs(){

        const ws = new WebSocket(this.wsUrl) 
        const interval = Math.ceil(41250*Math.random())
        console.log("heartbeat running every " + (interval/1000) + "s")
        ws.on('error', console.error)

        ws.on("open", ()=>{
            console.log("socket open")
        })

        const identify = () => {
            const e:wsEvent = {
                op: 2,
                d: {
                    token: this.#token,
                    properties: {
                        os: "linux",
                        browser: "ftmoh",
                        device: "ftmoh"
                    },
                    intents: 35329
                }
            }
            ws.send(JSON.stringify(e)) 
        }
        //listen for then start heartbeat
        ws.addEventListener('message', (d)=>{
            const event = JSON.parse(d.data)

            if (event.op === 10){
                const e:wsEvent = {
                    op: 1,
                    d: interval
                } 
            const sendEvent = () => ws.send(JSON.stringify(e))
            const heartbeat = setInterval(sendEvent,interval)
            identify()
            } 
        })

        //Check Heartbeat
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

        ws.addEventListener('message', (d)=>{
            const event = JSON.parse(d.data)
            if (event.op === 0 && event.t === "READY"){
                this.identified = true
                console.log(event)
            }
        })
    }
    
}
