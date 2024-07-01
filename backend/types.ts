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
