const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "password",
    description: "🔑 Generates a fully randomized and secured password",
    cooldown: 10,
    options: [
        {
            name: 'length',
            description: '↔️ Choose the password length (5 - 50)',
            type: "NUMBER",
            required: false,
        },
        {
            name: "capital_letters",
            description: "🔠 Choose if password will contain Capital Letters",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "yes",
                    value: "yes"
                },
                {
                    name: "no",
                    value: "no"
                },
            ]
        },
        {
            name: "numbers",
            description: "🔢 Choose if password will contain Numbers",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "yes",
                    value: "yes"
                },
                {
                    name: "no",
                    value: "no"
                },
            ]
        },
        {
            name: "special_characters",
            description: "＠ Choose if password will contain special characters",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "yes",
                    value: "yes"
                },
                {
                    name: "no",
                    value: "no"
                },
            ]
        },
    ],

    run: async (bot, interaction, args) => {

        try { 

            let passLength = interaction.options.getNumber('length')
            let capitalPass = interaction.options.getString('capital_letters')
            let numberPass = interaction.options.getString('numbers')
            let specialCharsPass = interaction.options.getString('special_characters')

            let passCharset

            if(!passLength) {
                passLength = 32
            }

            if(passLength > 50 || passLength < 5) {

                let basicError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : The password length needs to be between 5 and 40 characters`)
                    .setColor("RED")
                    .setTimestamp()
                return interaction.followUp({embeds: [basicError]})
                
            }

            if (capitalPass == "yes" && numberPass == "yes" && specialCharsPass == "yes" || !capitalPass && !numberPass || !specialCharsPass) {

                passCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@$%&*_-.;:'\""
            }

            if (capitalPass == "yes" && numberPass == "yes" && specialCharsPass == "no") {

                passCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            }

            if (capitalPass == "yes" && numberPass == "no" && specialCharsPass == "no") {

                passCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            }

            if (numberPass == "yes" && capitalPass == "no" && specialCharsPass == "yes") {
                
                passCharset = "abcdefghijklmnopqrstuvwxyz0123456789!@$%&*_-.;:'\""
            }

            if (numberPass == "no" && capitalPass == "yes" && specialCharsPass == "yes") {
                
                passCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@$%&*_-.;:'\""
            }

            if (numberPass == "yes" && capitalPass == "no" && specialCharsPass == "no") {
                
                passCharset = "abcdefghijklmnopqrstuvwxyz0123456789"
            }

            if (numberPass == "no" && capitalPass == "no" && specialCharsPass == "yes") {
                
                passCharset = "abcdefghijklmnopqrstuvwxyz!@$%&*_-.;:'\""
            }

            function generatePassword() {

        
                var length = passLength,
                    charset = passCharset,
                    retVal = "";
                for (var i = 0, n = charset.length; i < length; ++i) {
                    retVal += charset.charAt(Math.floor(Math.random() * n));
                }
                return retVal;
            }


            let password = generatePassword()

            const embed = new MessageEmbed() 
                .setTitle(`🔑 Password generation`)
                .setDescription(`✅ Your password has been successfully generated and sent in your DM's (Direct Messages)\n\n>>> Note: This password is automatically and randomly generated. The password isn't stocked anywhere.`)
                .setFooter({
                text: `Asked by ${interaction.user.username} • ${interaction.guild.name}`,
                iconURL: interaction.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 2048,
                }),
                })
                .setColor("RANDOM")
                .setTimestamp();

            const embed2 = new MessageEmbed() 
                .setTitle(`🔑 Password generation`)
                .setDescription(`Password:\n>>> ||${password}||`)
                .setFooter({
                text: `Sent by ${interaction.user.username} • ${interaction.guild.name}`,
                iconURL: interaction.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 2048,
                }),
                })
                .setColor("RANDOM")
                .setTimestamp();

        interaction.followUp({ embeds: [embed]});

        interaction.user.send({embeds: [embed2]})

        } catch (err) {
            console.log(err);
            if (err.length > 2010){
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An undefined error occured\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({embeds: [basicError]})
        }
    }
};