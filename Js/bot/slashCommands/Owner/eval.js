const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "eval",
    description: "👑 Evaluates and runs JavaScript code",
    options: [
        {
            name: "code",
            description: "📼 Script to evaluate and run",
            type: "STRING",
            required: true,
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            if (interaction.user.id !== "901071562386583596") {
                let userError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You need to be a devlopper or the owner of the bot`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [userError] })
            }
            
            var result = args.join(" ");
            if (!result) {
                let noEnter = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Please enter the code to evaluate`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [noEnter] })
            }
            if (result.length > 3024) {
                let userError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Command can't be longer than 3024 characters`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [userError] })
            }
            let evaluated = eval(result);
            let type = typeof evaluated;
            console.log("Code to eval: " + result);
            const success = new MessageEmbed()
                .setColor("#4f545c")
                .addField(`🔩 Type`, `\`\`\`js\n${type}\`\`\``)
                .addField(`📥 Input`, `\`\`\`js\n${args.join(" ")}\`\`\``)
                .addField(`📤 Output`, `\`\`\`js\n${evaluated}\`\`\``)
                .setFooter({
                    text: `Asked by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            interaction.followUp({ embeds: [success] });
        } catch (err) {
            const errormessage = new MessageEmbed()
                .setColor("RED")
                .setTitle(`❌ An error has occured!`)
                .addField(`Input`, `\`\`\`js\n${result}\`\`\``)
                .addField(`Output`, `\`\`\`js\n${err.message.toString().slice(0, 1000)}\`\`\``)
                .setFooter({
                    text: `Asked by ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            return interaction.followUp({ embeds: [errormessage] });
        }
    },
};
