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
            .setDescription('long or short')
            .addChoices(
                { name:'long', value:'position_long'},
                { name: 'short', value:'position_short'}
            )
            .setRequired(true)
    )
    .addNumberOption(option =>
        option.setName('profit')
        .setDescription('how much did you net')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('close-time')
        .setDescription('what time did you close your position')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('tp')
        .setDescription('what was your tp')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('sl')
        .setDescription('what was your sl')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('entry')
        .setDescription('what was your entry')
        .setRequired(true)
    )
    .addAttachmentOption(option => 
        option.setName('attachment1')
        .setDescription('upload a screenshot of the trade')
        .setRequired(true)
    )
    .addAttachmentOption(option => 
        option.setName('attachment2')
        .setDescription('additional screenshot')
    )

client.on(Events.InteractionCreate, async interaction =>{
    if (interaction.commandName === 'new-trade'){
        //const message = await interaction.fetchReply()
        //console.log(message)
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

