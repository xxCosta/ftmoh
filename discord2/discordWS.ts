import WebSocket from "ws";
import { Database } from "bun:sqlite"
import SQL from "sql-template-strings";

interface wsEvent{
    op: number,
    d: object|number,
    t?: string|null,
    s?: number|null
}


type TradeProps = {
    symbol: string,
    profit: number,
    endTime: string,
    type: number,
    positionSize: number,
    tp: number,
    sl: number,
    entry: number,
    attachment: string
}

const db = new Database("discord-db.sqlite");


export class DiscordWs {
    #wsUrl:string
    #token:string
    #identified:boolean = false
    #sessionId:string
    #resumeGatewayUrl:string
    #ws
    

    constructor(token:string){
        this.#initDb(token)
        this.#token = token
        setTimeout(()=>{
            this.#newMessageCreated()
        },1000)
    }

    async #initDb( token:string ) {
                

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

            this.#wsUrl = dwsQuery.value as string
            this.#initWs()
        } catch (e) {
            console.log(e)
        }
    }

   async #initWs(){

        const ws = new WebSocket(this.#wsUrl)
        this.#ws = ws 
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
            // 2 different events are called on OP=0
            // console log event for both
            if (event.op === 0 && event.t === "READY"){
                console.log("READY")
                this.#identified = true
                this.#sessionId = event.d.session_id
                this.#resumeGatewayUrl = event.d.resume_gateway_url
            }
        })
    }
    async #newMessageCreated(){
        this.#ws.addEventListener('message', (d)=>{
            const event = JSON.parse(d.data)
            if( event.t === "MESSAGE_CREATE" ){
                // console.log(event.d.content)
                let newTrade:TradeProps = {}
                newTrade.tp = event.d.content.match( /(?<=tp:\s)[\d.]+(?=\.)/g)[0]
                newTrade.sl = event.d.content.match( /(?<=sl:\s)[\d.]+(?=\.)/g)[0]
                newTrade.entry = event.d.content.match(/(?<=entry:\s)[\d.]+(?=\.)/g)[0]
                newTrade.symbol = event.d.content.match(/[A-Z]{6}/g)[0]
                newTrade.endTime = event.d.content.match(/[\d]+:[\d]+[apm]+/g)[0]
                newTrade.positionSize = event.d.content.match(/[\d.]+(?= lots)/g)[0]
                newTrade.type = event.d.content.match(/\b(long|short)\b/g)[0]
                let attachmentArray = event.d.attachments.map((a,i)=>`attachment${i}: `+ a.url)
                newTrade.attachment =attachmentArray.toString()


                let query = db.query(`INSERT
                         INTO 
                         DemoTrades (symbol,tp,sl,entry,endTime,positionSize,type,attachment)
                         VALUES (?1,?2,?3,?4,?5,?6,?7,?8)`)
                query.run(
                    newTrade.symbol,
                    newTrade.tp,
                    newTrade.sl,
                    newTrade.entry,
                    newTrade.endTime,
                    newTrade.positionSize,
                    newTrade.type,
                    newTrade.attachment)

                
            }
        })
    }
}



