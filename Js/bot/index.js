const { Collection } = require('discord.js');
const { Intents, MessageEmbed } = require('discord.js');
const DBL = require("dblapi.js");
const MongoClient = require('./utils/MongoClient');
const bot = new MongoClient({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES , Intents.FLAGS.GUILD_VOICE_STATES]});
const logger = require("./utils/modules/specials/logger");

//const Levels = require('discord-xp');

//Levels.setURL("mongodb+srv://Deku:12345@levels.u8mspxr.mongodb.net/?retryWrites=true&w=majority")

//Anti crash system

process.on("unhandledRejection", (reason, p) => {
    console.log(reason, p)
})
process.on("uncaughtException", (err, origin) => {
    console.log(err, origin)
})

//Login

bot.login("OTQ0NTcyODYxODc0NjAyMDU0.GvsRDR.Aig5ui46hifSDuf5T8Ix0Frs0sgOBIURWJzOes");

//Specials

bot.logger = logger;


//Music

const { Player } = require("discord-player");

bot.player = new Player(bot, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
})


//General
bot.commands = new Collection();
bot.slashCommands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();

//Utility
bot.snipes = new Collection();



bot.on('error', (error) => {
    console.log(error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"
    +error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n"+error+"\n\n");
});


require('./utils/handlers/command')(bot);
require('./utils/handlers/events')(bot);
require('./utils/handlers/slashCommands')(bot);
//require('./utils/handlers/specialEvents')(bot);