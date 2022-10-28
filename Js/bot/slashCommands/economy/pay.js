const { MessageEmbed } = require("discord.js")
const Discord = require('discord.js')


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

        if (!args[2]) reason = 'Reason not precised'


        let passivewarn = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.id}> : You have  \`PASSIVE\` enabled, you need to disable it to use this command.`);

        if (authorData.passive == true) return interaction.followUp({ embeds: [passivewarn] });

        if (!member || !args[0]) {

            let sendcoinsembed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ <@${usertag.id}> : Please specify the member`);
            return interaction.followUp({ embeds: [sendcoinsembed] }).catch();
            //return message.channel.send(`Who are you giving the coins to?`);
        }
        if (member.user.id == interaction.user.id) {
            let sendcoinsembed1 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ <@${usertag.id}> : You cannot pay yourself.`);
            return interaction.followUp({ embeds: [sendcoinsembed1] }).catch();
            //return message.channel.send(`Lol you can't give yourself coins u crazy.`);
        }
        if (!args[1]) {
            let sendcoinsembed2 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ <@${usertag.id}> : Please specify the amount of the payment.`);
            return interaction.followUp({ embeds: [sendcoinsembed2] }).catch();
            //return message.channel.send(`How much coins are you giving them?`);
        }

        if (isNaN(args[1]) && args[1] != 'all' || isNaN(args[1]) && args[1] != 'max') {
            return interaction.followUp({ content: `:warning: Sorry but the amount of the payment is incorrect.` })
        }
        if (args[1] == 'all' || args[1] == 'max') {
            return interaction.followUp({ content: `:warning: Sorry this option is disabled.` })
        }
        const userData = await bot.fetchUser(member.user.id);
        if (userData.passive == true) {
            let sendcoinsembed3 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ <@${usertag.id}> : The user you are trying to pay has \`PASSIVE\` enabled, they will need to disable it to be able to receive their amount of money.`);
            return interaction.followUp({ embeds: [sendcoinsembed3] }).catch();
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
            .setDescription(`:warning: <@${usertag.id}> : Are you sure you want to pay <@${member.user.id}> \`${parseInt(toGive).toLocaleString()}\` :coin:.\nYou will have to pay fees of \`${fees.toLocaleString()}\` :coin: .`);
        interaction.followUp({ embeds: [warnEmbed], components: [row] }).catch();

        const buttonFilter = (verifyInteraction) => {
            let notInteractionAuthorEmb = new MessageEmbed()
                .setColor("RED")
                .setDescription(`:x: <@${verifyInteraction.user.id}> : Only the author of the command can use the buttons`);

            if (verifyInteraction.user.id === interaction.user.id) return true;
            return interaction.followUp({ embeds: [notInteractionAuthorEmb], ephemeral: true })
        }

        const buttonColletor = interaction.channel.createMessageComponentCollector({
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
                button.reply({ embeds: [stop_embed] })

                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)

                interaction.editReply({ embeds: [warnEmbed], components: [row] })

                return
            }

            if (id === 'yes') {

                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)

                interaction.editReply({ embeds: [warnEmbed], components: [row] })





                if (toGive > authorData.coinsInWallet) {


                    let sendcoinsembed222 = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`❌ <@${usertag.id}> : You can't pay \`${parseInt(toGive).toLocaleString()}\` :coin: || You need ${parseInt(toGive).toLocaleString() - authorData.coinsInWallet}.`);
                    button.reply({ embeds: [sendcoinsembed222] }).catch();
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
                    .addField(`👤 Beneficiary:`, `<@${member.id}>`)
                    .setAuthor(interaction.member.nickname, interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))
                    .addField(`💰 Payment amount:`, `\`${parseInt(toGive).toLocaleString()}\` :coin:`)
                    .addField(`💸 Payment fees:`, `\`${fees}\` :coin:`)
                    .addField(`🧾 Reason:`, `\`${reason}\``)
                    .addField(`🎫 Author`, `<@${interaction.user.id}> `)
                    .setFooter(`Asked by ${interaction.member.nickname} • ${interaction.guild.name}`, interaction.guild.iconURL())
                    .setTimestamp()
                    .setDescription(`💳 <@${interaction.user.id}> payed <@${member.user.id}> \`${parseInt(toGive).toLocaleString()}\` :coin:, for: \`${reason}\``);
                button.reply({ embeds: [sendcoinsembed3] }).catch();


                let sendcoinsembed4 = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`🏧 You have been payed`)
                    .addField(`🎫 Author`, `${interaction.user.tag}`)
                    .setAuthor(member.user.username, member.displayAvatarURL({ size: 1024, dynamic: true }))
                    .addField(`💰 Payment amount:`, `\`${parseInt(toGive).toLocaleString()}\` :coin:`)
                    .addField(`🧾 Reason:`, `\`${reason}\``)
                    .setFooter(`Sent by ${interaction.member.nickname} • ${interaction.guild.name}`, interaction.guild.iconURL())
                    .setTimestamp()
                    .setDescription(`💳 ${interaction.user.tag} payed <@${member.user.id}> \`${parseInt(toGive).toLocaleString()}\` :coin:, for: \`${reason}\` in ${interaction.guild.name}`);
                member.send({ embeds: [sendcoinsembed4] }).catch();


            }

        })

    }
}