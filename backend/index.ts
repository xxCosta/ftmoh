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
    endTime
    type
    positionSize
    tp
    sl
    accountBalance

    constructor(symbol:string, profit:number, endTime:string, type:number, positionSize:number, tp:number, sl:number, accountBalance:number){
    this.symbol = symbol,
    this.profit = profit,
    this.endTime = endTime,
    this.type=type,
    this.positionSize=positionSize,
    this.tp=tp,
    this.sl=sl,
    this.accountBalance=accountBalance
    }
}



Bun.serve({
	port:8080,
	async fetch(request: Request){	
        let url = new URL(request.url)
        if(url.pathname === "/batchGet"){
            let allTrades = await db.batchGet('environment','live')
            let refinedTrades = allTrades.map(trade =>{
                console.log(trade)
            })
            console.log(refinedTrades)
            //allTrades.sort((a,b) =>a.endTime-b.endTime)
            return new Response("hello")
        }
        if(url.pathname === "/batchDelete"){
            let reqBody = await(request.json())
            let d = await db.batchDelete(reqBody.key,reqBody.value)
            return new Response(d)
        } 
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
            p.get("endTime"),
            Number(p.get("type")),
            Number(p.get("positionSize")),
            Number(p.get("tp")),
            Number(p.get("sl")),
            Number(p.get("accountBalance"))
        )
        
        await db.save(position)
    

        return new Response('wuts gud')
    }
	 
})
console.log("ready to receive");
