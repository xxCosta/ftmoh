import Redis from "./redis"
import type {TradeProps} from "./types"
import { tradeChecker } from "./errorChecker"
let db = new Redis
db.test()

//interface TradeProps {
//    symbol: string,
//    profit: number,
//    startTime: string,
//    endTime: string,
//    type: number,
//    positionSize: number,
//    tp: number,
//    sl: number,
//    duration: string|number 
//}

class Position implements TradeProps {
    symbol
    profit
    startTime
    endTime
    type
    positionSize
    tp
    sl
    duration
    accountBalance

    constructor(symbol:string, profit:number, startTime:string, endTime:string, type:number, positionSize:number, tp:number, sl:number, duration:string|number, accountBalance:string|number){
    this.symbol = symbol,
    this.profit = profit,
    this.startTime = startTime,
    this.endTime = endTime,
    this.type=type,
    this.positionSize=positionSize,
    this.tp=tp,
    this.sl=sl,
    this.duration=duration,
    this.accountBalance=accountBalance
    }
}

//let positionCounter:number


const getDuration = (startTime:string,endTime:string) => {
    //input string as hh:mm:ss
    let s:number[] = startTime.split(":").map((string) => Number(string))
    let e:number[] = endTime.split(":").map((string) =>Number(string))
    s[0]=s[0]*3600
    e[0]=e[0]*3600
    s[1]=s[1]*60
    e[1]=e[1]*60
    
    let startTotal:number = 0 
    let endTotal:number = 0

    s.forEach((seconds)=>startTotal+=seconds)
    e.forEach((seconds)=>endTotal+=seconds)
    
    let duration:number|string = endTotal-startTotal 
    if(duration > 60){
        let minutes = Math.floor(duration/60)
        let seconds = duration - (minutes*60)
        duration = `${minutes}:${seconds}`
    }

    if(typeof duration != "string"){
        return duration + "s" 
    }
    console.log(duration)
    return duration
    
}

Bun.serve({
	port:8080,
	async fetch(request: Request){
	
        let url = new URL(request.url)
        if(url.pathname === "/toggle"){
            let environment = await db.toggleEnv()
            return new Response(environment)
        }
        let position:TradeProps 
        const p = url.searchParams
        let duration
        //TODO: resolve promise on 2 position call
        position = new Position(
            p.get("symbol"),
            Number(p.get("profit")),
            p.get("startTime"),
            p.get("endTime"),
            Number(p.get("type")),
            Number(p.get("positionSize")),
            Number(p.get("tp")),
            Number(p.get("sl")),
            duration,
            p.get("accountBalance")
        )
        position.duration = getDuration(position.startTime.split(/[\s]+/).pop(), position.endTime.split(/[\s]+/).pop())
        
        await db.save(position)
    

        return new Response('wuts gud')
    }
	 
})
console.log("ready to receive");
