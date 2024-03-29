const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const { MessageEmbed } = require('discord.js');  

module.exports.run = async (bot, message, args) => {
    let data = await bot.fetchUser(message.author.id);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    try {
        if (args.join(' ') === 'all'|| args.join(' ') === 'max') {
                  if (data.coinsInBank === 0) {
            let bankerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ **${member.user.username}** : Your bank empty.`);
            return message.channel.send({embeds: [bankerrorembed]}).catch();
                  }
        data.coinsInWallet += data.coinsInBank;{
          
              let with2embed = new MessageEmbed()
              .setColor("BLUE")
              .setThumbnail()
              .setTitle(`🏦 Dêpot banquaire réalisé`)
              .setFooter(message.guild.name)
              .addField(`💰 Argent retiré:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
              .addField(`💸 Argent en banque:`,`**${data.coinsInBank}** :coin:`)
              .addField(`🏦 Espace banquaire restant:`,`**${data.coinsInBank+data.bankSpace}** d'espace banquaire`)
              await message.channel.send({embeds:[with2embed]});
          ////await message.channel.send(`Withdrawed **${data.coinsInBank}** coins.`);
          
        }

        data.coinsInBank -= data.coinsInBank;

        await data.save();
        } else {
        let withAmount = parseInt(args[0]);
                if (withAmount === 0) {
                let bankerrorembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ **${member.user.username}** : You cannot withdraw \`0\` :coin:.`);
                return message.channel.send({embeds: [bankerrorembed]}).catch();
                    }
            if (isNaN(withAmount)) {
                let numbererrorembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ **${member.user.username}** : \`${withAmount}\` is not a number.`);

                return message.channel.send({embeds: [numbererrorembed]}).catch();
                //return message.channel.send('That\'s not a number.');
            }

            if (parseInt(withAmount) > data.coinsInBank) {
                let with3embed = new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`:warning: **${member.user.username}** : You don't have \`${withAmount}\` in bank.`);
                return message.channel.send({embeds: [with3embed]});
                //return message.channel.send('You do not have that much coins.');
            }

            data.coinsInWallet += parseInt(withAmount); {
                let with4embed = new MessageEmbed()
                .setColor("BLUE")
                .setThumbnail()
                .setTitle(`🏦 Dêpot banquaire réalisé`)
                .setFooter(message.guild.name)
                .addField(`💰 Argent retiré:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
                .addField(`💸 Argent en banque:`,`**${data.coinsInBank}** :coin:`)
                .addField(`🏦 Espace banquaire restant:`,`**${data.coinsInBank+data.bankSpace}** d'espace banquaire`)
                await message.channel.send({embeds: [with4embed]});
            ///await message.channel.send(`Withdrawed **${args[0]}** coins.`);
            }

            data.coinsInBank -= parseInt(withAmount);

            await data.save();
        }
    } 
    catch (err) {
        message.channel.send(bot.errors.genericError + err.stack).catch();
    }
}

module.exports.config = {
    name: 'withdraw', // Command Name
    description: '', // Description
    usage: '+withdraw <somme>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['with'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 30 // Command Cooldown
}