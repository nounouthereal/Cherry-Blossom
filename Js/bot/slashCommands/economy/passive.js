const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "passive",
    description: "💤 Change or show your passive mod",
    timeout: 5000,
    options: [
        {
            name: "mod",
            description: '💤 The passive mod',
            type: "STRING",
            required: false,
            choices: [
                {
                    name: `enable`,
                    description: `You will have protections but some actions will be blocked`,
                    value: `enable`,
                },
                {
                    name: `disable`,
                    description: `You will have no protections but you will be able use all the actions`,
                    value: `disable`,
                }
            ],
        },
    ],

    run: async (bot, interaction, args) => {  

        const member = interaction.member || interaction.user;
        const userData = await bot.fetchUser(interaction.user.id);


        if (!args[0]) {
            let status = userData.passive
            if (status == false) status=`🔥 \`DISABLED\``
            else status=`💤 \`ENABLED\``
            
            let passive1embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`💁 <@${member.id}> : Your passive mod is actually : ${status}.`)
            .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
            .setTimestamp();
            return interaction.followUp({embeds: [passive1embed]}).catch();
        }

        if (args[0] == `enable`) {
            let passive2embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`💁 <@${member.id}> : Your passive mod is already 💤 \`ENABLED\`.`)
            .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
            .setTimestamp()

            if (userData.passive == true) return interaction.followUp({embeds: [passive2embed]}).catch();

            userData.passive=true;
            await userData.save();

            let passive3embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ <@${member.id}> : Your passive mod is now set to : 💤 \`ENABLED\`.`)
            .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
            .setTimestamp();

            interaction.followUp({embeds: [passive3embed]}).catch();
            //message.reply(`I have enabled your passive mode`);
        }
        else if (args[0] == `disable`) {
            let passive4embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`💁 <@${member.id}> : Your passive mod is already 🔥 \`DISABLED\`.`)
            .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
            .setTimestamp();

            if (userData.passive == false) return interaction.followUp({embeds: [passive4embed]}).catch();
            userData.passive=false;
            await userData.save();
            let passive5embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ <@${member.id}> : Your passive mod is now set to : 🔥 \`DISABLED\`.`)
            .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
            .setTimestamp();
            interaction.followUp({embeds: [passive5embed]}).catch();
        } else {
            let passive6embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${member.id}> : This is not a valid option. (\`+passive enable || disable\`)`);

            interaction.followUp({embeds: [passive6embed]}).catch();

        }

    }
}