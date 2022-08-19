const { MessageEmbed} = require("discord.js")
const { ActionRowBuilder, ButtonBuilder } = require('@discordjs/builders')


module.exports = {
    name: "pay",
    description: "🏧 Pay an user",
    timeout: 5000,
    options: [
        {
            name: "user",
            description: '👤 The user which will be payed',
            type: "USER",
            required: true,
        },
        {
            name: "money",
            description: '💰 The payment amount',
            type: "NUMBER",
            required: true,
        },
        {
            name: "reason",
            description: '🧾 The reason of the payment',
            type: "STRING",
            required: false,
        },
    ],

    run: async (bot, interaction, args) => {  

        const usertag = interaction.member;
        const authorData = await bot.fetchUser(interaction.user.id);
        const member = interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);
        let reason = args[2]
    
        if(!args[2]) reason = 'Reason not precised by the author of the payment'
    
    
        let passivewarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
      
        if (authorData.passive == true) return interaction.followUp({embeds: [passivewarn]});
    
        if (!member || !args[0]) {
          
        let sendcoinsembed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.id}> : Please specify the member`);
        return interaction.followUp({embeds: [sendcoinsembed]}).catch();
            //return message.channel.send(`Who are you giving the coins to?`);
        }
        if (member.user.id == message.author.id) {
        let sendcoinsembed1 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.id}> : You cannot pay yourself.`);
        return interaction.followUp({embeds: [sendcoinsembed1]}).catch();
       //return message.channel.send(`Lol you can't give yourself coins u crazy.`);
        }
        if (!args[1]) {
        let sendcoinsembed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.id}> : Please specify the amount of the payment.`);
        return interaction.followUp({embeds: [sendcoinsembed2]}).catch();
        //return message.channel.send(`How much coins are you giving them?`);
        }
    
        if (isNaN(args[1]) && args[1] != 'all' || isNaN(args[1]) && args[1] != 'max') {
            return interaction.followUp({content: `:warning: Sorry but the amount of the payment is incorrect.`})
        }
        if (args[1] == 'all' || args[1] == 'max') {
            return interaction.followUp({content: `:warning: Sorry this option is disabled.`})
        }
        const userData = await bot.fetchUser(member.user.id);
        if (userData.passive == true) {
        let sendcoinsembed3 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.id}> : The user you are trying to pay has \`PASSIVE\` enabled, they will need to disable it to be able to receive their amount of money.`);
        return interaction.followUp({embeds: [sendcoinsembed3]}).catch();
          //return message.channel.send(`That user is in passive mode, they can't recive any coins`);
        }
                                      
        
        const toGive = args[1];
    
        if (toGive > authorData.coinsInWallet) {
              
            let sendcoinsembed222 = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.id}> : You can't pay \`${parseInt(toGive).toLocaleString()}\` :coin: || You need ${parseInt(toGive).toLocaleString() - authorData.coinsInWallet}.`);
            return message.channel.send({embeds: [sendcoinsembed222]}).catch();
        }
              
            
    
        authorData.coinsInWallet = (authorData.coinsInWallet - parseInt(toGive));
    
        await authorData.save();
    
        userData.coinsInWallet = (userData.coinsInWallet + parseInt(toGive));
    
        await userData.save();
    
        let sendcoinsembed3 = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`🏧 Payment realisé`)
        .addField(`👤 Beneficiary:`,`<@${member.id}>`)
        .setAuthor(message.member.displayName,message.author.displayAvatarURL({ size: 1024, dynamic: true }))
        .addField(`💰 Payment amount:`,`**${parseInt(toGive).toLocaleString()}** :coin:`)
        .addField(`🧾 Reason:`,`\`${reason}\``)
        .addField(`🎫 Author`,`<@${message.author.id}> `)
        .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        .setDescription(`💳 <@${message.author.id}> payed <@${member.user.id}> **${parseInt(toGive).toLocaleString()}** :coin:, for: \`${reason}\``);
        message.channel.send({embeds: [sendcoinsembed3]}).catch();
        
    
        let sendcoinsembed4 = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`🏧 You have been payed`)
        .addField(`🎫 Author`,`${message.author.tag}`)
        .setAuthor(member.user.username,member.displayAvatarURL({ size: 1024, dynamic: true }))
        .addField(`💰 Payment amount:`,`**${parseInt(toGive).toLocaleString()}** :coin:`)
        .addField(`🧾 Reason:`,`\`${reason}\``)
        .setFooter(`Sent by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
        .setTimestamp()
        .setDescription(`💳 ${message.author.tag} payed <@${member.user.id}> **${parseInt(toGive).toLocaleString()}** :coin:, for: \`${reason}\` in ${message.guild.name}`);
        member.send({embeds: [sendcoinsembed4]}).catch();
         
    }
}