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

const token:string = Bun.env.TOKEN!
const appId:string = Bun.env.APP_ID!


client.login(token)

client.once(Events.ClientReady, () =>{
    console.log("client open")
})

const testCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('test function')


client.on(Events.InteractionCreate, async interaction => {
    if(interaction.commandName === 'ping'){
        await interaction.reply('pong')
    }
})



const newTradeCommand = new SlashCommandBuilder()
    .setName('new-trade')
    .setDescription('add new trade')
    .addStringOption(option => 
        option.setName('symbol')
            .setDescription('what symbol did you trade')
            .setAutocomplete(true)
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('position')
            .setDescription('long or short?')
            .addChoices(
                { name:'long', value:'position_long'},
                { name: 'short', value:'position_short'}
            )
            .setRequired(true)
    )

client.on(Events.InteractionCreate, async interaction =>{
    if (interaction.commandName === 'new-trade'){
        await interaction.reply('trade saved')
    }
})

let commands = []
commands.push(testCommand.toJSON())
commands.push(newTradeCommand.toJSON())


try{
    let rest = new REST().setToken(token)
    await rest.put(Routes.applicationCommands(appId),{body: commands})
}catch(error){
    console.log(error)
}

