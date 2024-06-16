import type {TradeProps} from "./types"

class EM{
    //build error messages
    message
    status:number = 400
    constructor(message:string){
        this.message="ERROR: "+ message

    }
}


//TODO: change this function to something less verbose:
export const tradeChecker = (position:TradeProps) => {
    if(position.symbol.length < 6 || typeof position.symbol != "string"){
        return  new EM(`cant read "symbol" property`)         
    }else if(typeof position.profit != "number"){
        return new EM(`can't read "profit" property`)
    }else if (position.startTime.length < 19 || position.endTime.length < 19){
        return new EM ('cant read start and/or end time')
    }else if (position.positionSize === 0.00){
        return new EM('cant read position size')
    }
}
