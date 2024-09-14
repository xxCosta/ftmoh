import * as readline from 'node:readline'
// import * as readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import type { SlashCommand, Option, Choice } from './discordHTTP';
import DiscordHttp from './discordHTTP'; 
//THIS FILE WILL BE THE ENTRYPOINT TO THE CLI
//THE CLI WILL BE RESPONSIBLE FOR CRUD OF COMMANDS AND OVERALL ADMIN
//NO LOGIC SHOULD GO IN HERE UNLESS IT'S CLI RELATED



const discord = new DiscordHttp
const rl = readline.createInterface(stdin,stdout)

//----WHAT DO YOU WANT TO DO-----
rl.write("so den? what are manz tryna do? \n")
const intentions:string[] = ["CRUD Slash Commands", "stats", "admin"]

intentions.forEach((option, i) => {
    rl.write(option + "\n")
})

//----CHOICE-----
let intention:string = ""
if(intention === ""){
    rl.on("line", (r) => {
        //console.log(r)
        intention = r
        rl.close()
    })
}



const testCommand:SlashCommand = {

    name: "test",
    type: 1,
    description: "test from cli"
}
//----SLASH COMMAND CRUD----
// if(intention === "CRUD Slash Commands"){
//     discord.newCommand(testCommand)
// }



