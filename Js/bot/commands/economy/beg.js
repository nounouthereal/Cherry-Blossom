/*
module.exports.execute = async (client, message, args) => {
    let users = [
        "nounou"
    ];
    let amount = Math.floor(Math.random() * 50) + 10;
    let beg = client.eco.beg(client.ecoAddUser, amount, { canLose: true });
    if (beg.onCooldown) return message.reply(`Begon Thot! Come back after ${beg.time.seconds} seconds.`);
    if (beg.lost) return message.channel.send(`**${users[Math.floor(Math.random() * users.length)]}:** Begon Thot! Try again later.`);
    else return message.reply(`**${users[Math.floor(Math.random() * users.length)]}** donated you **${beg.amount}** 💸. Now you have **${beg.after}** 💸.`);
};

module.exports.help = {
    name: "beg",
    aliases: [],
    usage: "beg"
}
*/

const { MessageEmbed } = require("discord.js");
const i = '<:info:960112342711042068>'
const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'
module.exports.run = async (bot, message, args) => {
    const usertag = message.member;
    const random = Math.round(Math.random() * 100);
    const randomMessage = [
        `**Elon Musk** vous a donné ${random.toLocaleString()} :coin:.`,
        `**Bill Gates** vous a donné ${random.toLocaleString()} :coin:.`,
        `Un **riche** vous a donné ${random.toLocaleString()} :coin:.`,
        `Emmanuel macron vous a donné ${random.toLocaleString()} :coin:.`,
    ];
  
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
  
    let begembed = new MessageEmbed()
    .setColor("#57c478")
    .addField(`${tick} Vous avez reçu de l'argent`,` **${usertag.user.username}** : ${response}`)
    await message.channel.send({embeds: [begembed]}).catch();
  
    await bot.giveCoins(message.author.id, random);
}

module.exports.config = {
    name: 'beg', // Command Name
    description: 'Demande a des gens de l\'argent', // Description
    usage: '+beg', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 13, // Amount of bank space to give when command is used.
    cooldown: 120 // Command Cooldown
}