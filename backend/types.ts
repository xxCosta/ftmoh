import {Schema} from "redis-om"

export interface TradeProps {
    symbol: string,
    profit: number,
    endTime: string,
    type: number,
    positionSize: number,
    tp: number,
    sl: number,
    accountBalance: number
}


export class Position implements TradeProps {
    symbol
    profit
    endTime
    type
    positionSize
    tp
    sl
    accountBalance

    constructor(symbol: string, profit: number, endTime: string, type: number, positionSize: number, tp: number, sl: number, accountBalance: number) {
        this.symbol = symbol,
            this.profit = profit,
            this.endTime = endTime,
            this.type = type,
            this.positionSize = positionSize,
            this.tp = tp,
            this.sl = sl,
            this.accountBalance = accountBalance
    }
}


export const tradeSchema = new Schema('trade', {
    symbol:{ type: 'string' },
    profit:{ type: 'number' },
    endTime:{type: 'string'},
    type:{ type: 'number' },
    positionSize:{ type: 'number' },
    tp:{ type: 'number' },
    sl:{ type: 'number' },
    accountBalance: {type: 'number'},
    environment: {type: 'string'}
},{dataStructure: 'JSON'})
