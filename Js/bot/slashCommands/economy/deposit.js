const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "deposit",
    description: "🏦 Deposit your money in the bank (In V2 Posibility to put your money in a user society bank)",
    timeout: 5000,
    options: [

        {
            name: "amount",
            description: '💸 The amount of money you want to deposit in the bank',
            type: "NUMBER",
            required: true,
        }

    ],

    run: async (bot, interaction, args) => {    
    
    
    let data = await bot.fetchUser(interaction.user.id);
    const member = interaction.member || interaction.user

    if (args.join(' ') === 'all') {
        if (data.coinsInWallet > data.bankSpace) {
            const max_deposit = (data.coinsInWallet + data.coinsInBank - data.bankSpace);
        
            if (data.coinsInBank-data.bankSpace === 0) {
            let bankerrorembed = new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`:warning: <@${member.user.id}> : You bank is full.`);

            return interaction.followUp({embeds: [bankerrorembed]}).catch();
            //return message.channel.send("You don't have that much space in your bank. ");
        }
            
            
            
            data.coinsInWallet = max_deposit;
            let dep111embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()
            await interaction.followUp({embeds: [dep111embed]}).catch();
            //await message.channel.send(`Deposited **${data.bankSpace - data.coinsInBank}** coins.`);

            data.coinsInBank = ((data.coinsInWallet + data.bankSpace) - max_deposit);

            await data.save();
        } else {

            if ((data.coinsInWallet + data.coinsInBank) > data.bankSpace) {
                const left = (data.coinsInWallet + data.coinsInBank) - data.bankSpace;

            let begembed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()

            await interaction.followUp({embeds: [begembed]}).catch();
                
                //message.channel.send(`Deposited **${(data.coinsInWallet - left).toLocaleString()}** coins`);
                
                data.coinsInBank += (data.coinsInWallet - left);
                data.coinsInWallet = left;

                await data.save();
            } else {
            let dep111embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()
            await interaction.followUp({embeds: [dep111embed]}).catch();

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

            return interaction.followUp({embeds: [numbererrorembed]}).catch();
        }
        if ( data.bankSpace - data.coinsInBank < parseInt(args[0])) {
            let bankfullerrorembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`:warning: <@${member.user.id}> : You don't have enough banking space. You need ${args[0] + data.bankSpace - data.coinsInBank }.`);

            return interaction.followUp({embeds: [bankfullerrorembed]}).catch();
        }
        if (parseInt(args[0]) > data.coinsInWallet) {
            let moneyerrorembed = new MessageEmbed()
            .setColor("YELLOW")
            .setDescription(`:warning: <@${member.user.username}> : You don't have \`${args[0]}\` :coin: in your account.`);
            interaction.followUp({embeds: [moneyerrorembed]})
            //return message.channel.send("You don't have that much money.");
        }

        data.coinsInBank += parseInt(args[0]);
            let depamountembed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`🏦 Bank deposit`)
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .addField(`💰 Deposited money:`,`**${parseInt(args[0]).toLocaleString()}** :coin:`)
            .addField(`💸 Money in bank:`,`**${data.coinsInBank}** :coin:`)
            .addField(`🏦 Remaining bank space:`,`**${data.coinsInBank-data.bankSpace}** bank space`)
            .setTimestamp()

            await interaction.followUp({embeds: [depamountembed]}).catch();
        //await message.channel.send(`Deposited **${args[0]}** coins.`);

        data.coinsInWallet -= parseInt(args[0]);

        await data.save();
    }
    }

}    