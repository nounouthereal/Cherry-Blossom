
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

        let sent

        const usertag = message.member;
        const authorData = await bot.fetchUser(message.author.id);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);
        let reason = args[2]
    
        if(!args[2]) reason = 'Reason not precised'
    
    
        let passivewarn = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.user.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);
      
        if (authorData.passive == true) return message.channel.send({embeds: [passivewarn]});
    
        if (!member || !args[0]) {
          
        let sendcoinsembed = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.user.id}> : Please specify the member`);
        return message.channel.send({embeds: [sendcoinsembed]}).catch();
            //return message.channel.send(`Who are you giving the coins to?`);
        }
        if (member.user.id == message.author.id) {
        let sendcoinsembed1 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.user.id}> : You cannot pay yourself.`);
        return message.channel.send({embeds: [sendcoinsembed1]}).catch();
       //return message.channel.send(`Lol you can't give yourself coins u crazy.`);
        }
        if (!args[1]) {
        let sendcoinsembed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.user.id}> : Please specify the amount of the payment.`);
        return message.channel.send({embeds: [sendcoinsembed2]}).catch();
        //return message.channel.send(`How much coins are you giving them?`);
        }
    
        if (isNaN(args[1]) && args[1] != 'all' || isNaN(args[1]) && args[1] != 'max') {
            return message.channel.send(`**:warning: Sorry but the amount of the payment is incorrect.**`)
        }
        if (args[1] == 'all' || args[1] == 'max') {
            return message.channel.send(`:warning: Sorry this option is disabled.`)
        }
        const userData = await bot.fetchUser(member.user.id);
        if (userData.passive == true) {
        let sendcoinsembed3 = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ <@${usertag.user.id}> : The user you are trying to pay has \`PASSIVE\` enabled, they will need to disable it to be able to receive their amount of money.`);
        return message.channel.send({embeds: [sendcoinsembed3]}).catch();
          //return message.channel.send(`That user is in passive mode, they can't recive any coins`);
        }

        const toGive = args[1];


        let percentage = 15 //For the moment if the user has or is in a bank society percent will be randomly between 4 and 7
              
        let fees = Math.round((percentage / 100) * parseInt(toGive))

        const row = new Discord.MessageActionRow().addComponents(

            new Discord.MessageButton()
		    .setStyle('SUCCESS')
		    .setLabel("Yes")
		    .setCustomId("yes"),

	        new Discord.MessageButton()
		    .setStyle('DANGER')
		    .setLabel("No")
		    .setCustomId("no")
        )

        let warnEmbed = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`:warning: <@${usertag.user.id}> : Are you sure you want to pay <@${member.user.id}> \`${parseInt(toGive).toLocaleString()}\` :coin:.\nYou will have to pay fees of \`${fees.toLocaleString()}\` :coin: .`);
        sent = await message.channel.send({embeds: [warnEmbed], components: [row]}).catch();

        const buttonFilter = (verifyInteraction) => {
            let notInteractionAuthorEmb = new MessageEmbed()
            .setColor("RED")
            .setDescription(`:x: <@${verifyInteraction.user.id}> : Only the author of the command can use the buttons`);

            if (verifyInteraction.user.id === message.author.id) return true;
            return message.channel.send({embeds: [notInteractionAuthorEmb], ephemeral: true})
        }

        const buttonColletor = message.channel.createMessageComponentCollector({
            buttonFilter,
            max: 1,
        })

        buttonColletor.on("end", async (ButtonInteraction) => {
            const button = ButtonInteraction.first()

            const id = button.customId;

            if (id === 'no') {
                let stop_embed = new MessageEmbed()
                .setDescription(`:bulb: You stoped the command.`)
                .setColor("YELLOW")
                button.reply({embeds: [stop_embed]})

                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)

                sent.edit({embeds: [warnEmbed], components: [row] })

                return
            }

            if (id === 'yes') { 

                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)

                sent.edit({embeds: [warnEmbed], components: [row] })



                                      
            
            if (toGive > authorData.coinsInWallet) {

                
                let sendcoinsembed222 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ <@${usertag.user.id}> : You can't pay \`${parseInt(toGive).toLocaleString()}\` :coin: || You need ${parseInt(toGive).toLocaleString() - authorData.coinsInWallet}.`);
                return button.reply({embeds: [sendcoinsembed222]}).catch();
            }
                
        
            authorData.coinsInWallet = (authorData.coinsInWallet - parseInt(toGive));
        
            await authorData.save();

            authorData.coinsInWallet = (authorData.coinsInWallet - fees);
        
            await authorData.save();
        
            userData.coinsInWallet = (userData.coinsInWallet + parseInt(toGive));
        
            await userData.save();

        
            let sendcoinsembed3 = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`🏧 Payment successful`)
            .addField(`👤 Beneficiary:`,`<@${member.id}>`)
            .setAuthor(message.member.displayName,message.author.displayAvatarURL({ size: 1024, dynamic: true }))
            .addField(`💰 Payment amount:`,`\`${parseInt(toGive).toLocaleString()}\` :coin:`)
            .addField(`💸 Payment fees:`,`\`${fees}\` :coin:`)
            .addField(`🧾 Reason:`,`\`${reason}\``)
            .addField(`🎫 Author`,`<@${message.author.id}> `)
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            .setDescription(`💳 <@${message.author.id}> payed <@${member.user.id}> \`${parseInt(toGive).toLocaleString()}\` :coin:, for: \`${reason}\``);
            button.reply({embeds: [sendcoinsembed3]}).catch();
            
        
            let sendcoinsembed4 = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`🏧 You have been payed`)
            .addField(`🎫 Author`,`${message.author.tag}`)
            .setAuthor(member.user.username,member.displayAvatarURL({ size: 1024, dynamic: true }))
            .addField(`💰 Payment amount:`,`\`${parseInt(toGive).toLocaleString()}\` :coin:`)
            .addField(`🧾 Reason:`,`\`${reason}\``)
            .setFooter(`Sent by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            .setDescription(`💳 ${message.author.tag} payed <@${member.user.id}> \`${parseInt(toGive).toLocaleString()}\` :coin:, for: \`${reason}\` in ${message.guild.name}`);
            member.send({embeds: [sendcoinsembed4]}).catch();


        }

        })
     
}
module.exports.config = {
    name: 'pay', // Command Name
    description: '🏧 Pay a member', // Description
    usage: '+pay @member <amount> Optionnal: <raison>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['give','transfer'], // Aliases 
    bankSpace: 3, // Amount of bank space to give when command is used.
    cooldown: 60 // Command Cooldown
}