const ms = require("parse-ms-2");
const { MessageEmbed } = require("discord.js")


module.exports.run = async (bot, message, args) => {

    const user = await bot.fetchUser(message.author.id);
    console.log(work)

    let fireEmbed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(":warning: Thanks to wait the V1.0 with the comapany system to use this command")

    message.channel.send({embeds: [fireEmbed]})
    /*let timeout = 360;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`🔒 **${user.user.username}** : Tu as déjà travaillé il y a peu de temps\n\nRéessaye dans : ${time.minutes}m ${time.seconds}s `);
        message.channel.send({embeds: [timeEmbed]})
      } else {
        let replies = ['🧑🏻‍💻 Informaticien','👷 Ouvrier','👩‍🍳 Cuisinier','🚛 Livreur','🧑🏻‍⚕️ Infirmier','🧑‍🔧 Méchanicien']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 300) + 1;
        let embed1 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ Tu as travaillé comme ${replies[result]} et gagné ${amount} :dollar:`);
        message.channel.send({embeds: [embed1]})
        
        bot.giveCoins(message.author.id, amount)
    };*/
}

module.exports.config = {
    name: 'work', // Command Name
    description: 'work', // Description
    usage: '+work', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['travail','job','boulot'], // Aliases 
    bankSpace: 50, // Amount of bank space to give when command is used.
    cooldown: 45 // Command Cooldown
}