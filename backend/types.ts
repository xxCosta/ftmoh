import {Schema} from "redis-om"

export interface TradeProps {
    symbol: string,
    profit: number,
    startTime: string,
    endTime: string,
    type: number,
    positionSize: number,
    tp: number,
    sl: number,
    duration: string|number,
    accountBalance: string|number
}


export const tradeSchema = new Schema('trade', {
    symbol:{ type: 'string' },
    profit:{ type: 'number' },
    startTime:{ type: 'string' },
    endTime:{ type: 'string' },
    type:{ type: 'number' },
    positionSize:{ type: 'number' },
    tp:{ type: 'number' },
    sl:{ type: 'number' },
    duration:{ type: 'string' } 
},{dataStructure: 'JSON'})
