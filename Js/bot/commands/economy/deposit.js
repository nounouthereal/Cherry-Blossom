const { MessageEmbed } = require('discord.js');
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'

module.exports.run = async (bot, message, args) => {
    let data = await bot.fetchUser(message.author.id);
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if (args.join(' ') === 'all') {
        if (data.coinsInWallet > data.bankSpace) {
            const max_deposit = (data.coinsInWallet + data.coinsInBank - data.bankSpace);
         
          if (data.coinsInBank-data.bankSpace === 0) {
            let bankerrorembed = new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`:warning: <@${member.user.id}> : You bank is full.`);

            return message.channel.send({embeds: [bankerrorembed]}).catch();
            //return message.channel.send("You don't have that much space in your bank. ");
        }
          
          
          
            data.coinsInWallet = max_deposit;
            let dep111embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()
            await message.channel.send({embeds: [dep111embed]}).catch();
            //await message.channel.send(`Deposited **${data.bankSpace - data.coinsInBank}** coins.`);

            data.coinsInBank = ((data.coinsInWallet + data.bankSpace) - max_deposit);

            await data.save();
        } else {

            if ((data.coinsInWallet + data.coinsInBank) > data.bankSpace) {
                const left = (data.coinsInWallet + data.coinsInBank) - data.bankSpace;

            let begembed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()

            await message.channel.send({embeds: [begembed]}).catch();
              
                //message.channel.send(`Deposited **${(data.coinsInWallet - left).toLocaleString()}** coins`);
                
                data.coinsInBank += (data.coinsInWallet - left);
                data.coinsInWallet = left;

                await data.save();
            } else {
            let dep111embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()
            await message.channel.send({embeds: [dep111embed]}).catch();
            //message.channel.send(`Deposited **${(data.coinsInWallet).toLocaleString()}** coins`);

                data.coinsInBank += data.coinsInWallet;
                data.coinsInWallet = 0;

                await data.save();
            }
        }
    } else {
        if (isNaN(args[0])) {
          let numbererrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${member.user.id}> : The amount of money you want to deposit is not a number.`);

            return message.channel.send({embeds: [numbererrorembed]}).catch();
            //return message.channel.send('That\'s not a number.');
        }
        if ( data.bankSpace - data.coinsInBank < parseInt(args[0])) {
            let bankfullerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`:warning: <@${member.user.id}> : You don't have enough banking space. You need ${data.bankSpace - data.coinsInBank + args[0]}.`);

            return message.channel.send({embeds: [bankfullerrorembed]}).catch();
            //return message.channel.send('Your bank is not big enough.');
        }
        if (parseInt(args[0]) > data.coinsInWallet) {
          let moneyerrorembed = new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`:warning: <@${member.user.username}> : You don't have \`${args[0]}\` :coin: in your account.`);
            message.channel.send({embeds: [moneyerrorembed]})
            //return message.channel.send("You don't have that much money.");
        }

        data.coinsInBank += parseInt(args[0]);
            let depamountembed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()

            await message.channel.send({embeds: [depamountembed]}).catch();
        //await message.channel.send(`Deposited **${args[0]}** coins.`);

        data.coinsInWallet -= parseInt(args[0]);

        await data.save();
    }
}

module.exports.config = {
    name: 'deposit', // Command Name
    description: 'Deposit your money in the bank', // Description
    usage: '+deposit <sum>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['dep','bankadd','addbank'], // Aliases 
    bankSpace: 15, // Amount of bank space to give when command is used.
    cooldown: 30 // Command Cooldown
}