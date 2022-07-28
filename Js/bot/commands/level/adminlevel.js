const { MessageEmbed } = require("discord.js")
const Levels = require('../../models/LevelsModel');
const Prizes = require('../../models/PrizesModel');


module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
    let levelData = await Levels.findOne({ guildId: message.guild.id, userId: user.id });

    let embed_help1 = new MessageEmbed()
    .setColor('#57c478')
    .setTitle(`Merci de choisir une option:`)
    .addField(`━━━━━━━━━━━━━━━━━━━━━━━━`,`> \`on\` → Active le système de niveaux\n> \`off\` → Désactive le système de niveaux\n> \`prize\` → Configure/Affiche le système de récompenses`)

    message.channel.send({embeds: [embed_help1]})

    let filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages({filter: filter ,max: 1,time: 25000,errors: ['time']}).then((collected) => {
        let fcollected = collected.first()
        if (fcollected.content === "prizes" || fcollected.content.includes("Prizes") ||fcollected.content.includes("prize") ||fcollected.content.includes("Prizes")||fcollected.content.includes("Récompenses") || fcollected.content.includes("récompenses")) {
                        
            let embed_prize1 = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Merci de choisir une option:`)
            .addField(`━━━━━━━━━━━━━━━━━━━━━━━━`,`> \`add\` → Ajoute une récompense\n> \`remove\` → Retire une récompense\n> \`list\` → Liste les/la récompense(s)`)

            message.channel.send({embeds: [embed_prize1]})

            message.channel.awaitMessages({filter: filter ,max: 1,time: 25000,errors: ['time']}).then((collected) => {
            let fcollected = collected.first()
            if (fcollected.content === "add" || fcollected.content.includes("Add") ||fcollected.content.includes("ajouter") ||fcollected.content.includes("Ajouter")||fcollected.content.includes("prizeadd") || fcollected.content.includes("addprize")) {
                
            }})

        }
    }).catch(_ => {
        let timeout = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${x} **${member.user.username}** : Tu as mis trop de temps à choisir, la commande a été annulée`);
        return message.channel.send({embeds: [timeout]}).catch();})
};

module.exports.config = {
    name: 'adminlevel', // Command Name
    description: 'Configure le système de niveaux', // Description
    usage: '+adminlevel <wait for help embed>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['leveladmin','AdminLevel','admin_level','level_admin','levelAdmin','Adminlevel','adminxp','xpadmin','Adminxp','XPadmin','adminXP'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}