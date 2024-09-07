const url:string = "https://discord.com/api/gateway/bot"


type SlashCommand = {
    name: string,
    type: number,
    description: string,
    options: Option[]
}

type Option = {
    name: string,
    description: string,
    type: number,
    required: boolean,
    choices?: Choice[] 
}

type Choice = {
    name: string,
    value: string
}

class CommandBuilder implements SlashCommand {

}

export default class DiscordHttp {
    constructor(){
        
    }    
}
