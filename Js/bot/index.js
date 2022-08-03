const { Collection } = require('discord.js');
const { Client, Intents, MessageEmbed } = require('discord.js');
const DBL = require("dblapi.js");
const MongoClient = require('./utils/MongoClient');
const bot = new MongoClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]}, {fetchAllMembers: false });
//const Levels = require('discord-xp');

//Levels.setURL("mongodb+srv://Deku:12345@levels.u8mspxr.mongodb.net/?retryWrites=true&w=majority")


bot.login("OTQ0NTcyODYxODc0NjAyMDU0.GCIs60.KrrHt4k2zPm7vahiuhsW2yb04cf0RITSoWZDKI");

bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();


require('./utils/handlers/command')(bot);
require('./utils/handlers/events')(bot);
//require('./utils/handlers/specialEvents')(bot);