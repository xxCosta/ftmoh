import {
    Client,
    Events,
    GatewayIntentBits,
    SlashCommandBuilder,
    REST,
    Routes

} from "discord.js"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})

const token:String = Bun.env.TOKEN!

client.login(token)

client.once(Events.ClientReady, () =>{
    console.log("client open")
})

const command1 = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('test function')


client.on(Events.InteractionCreate, async interaction => {
    if(interaction.commandName === 'ping'){
        await interaction.reply('pong')
    }
})

let commands = []
commands.push(command1.toJSON())

try{
    let rest = new REST().setToken(token)
    let r = await rest.put(Routes.applicationCommands(Bun.env.APP_ID),{body: commands})
}catch(error){
    console.log(error)
}

