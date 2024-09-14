const url:string = "https://discord.com/api/gateway/bot"


export type SlashCommand = {
    name: string,
    type: number,
    description: string,
    options?: Option[]
}

export type Option = {
    name: string,
    description: string,
    type: number,
    required: boolean,
    choices?: Choice[] 
}

export type Choice = {
    name: string,
    value: string
}


export default class DiscordHttp {
    constructor(){
        
    }   

    public newCommand(commandProps: SlashCommand){
        return "hello"
    }
}
