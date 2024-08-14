
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


export class Trade implements TradeProps {
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





