import {Client, Events, GatewayIntentBits, SlashCommandBuilder, Collection} from "discord.js"

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
})

client.login(Bun.env.TOKEN)

client.once(Events.ClientReady, () =>{
    console.log("we ready to receive")
})





