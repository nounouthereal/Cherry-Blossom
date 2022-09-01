const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "servers",
    description: "💾 Show all my servers",
    timeout: 5000,

    run: async (bot, interaction, args) => {


        try {

        const embed = new MessageEmbed() 
            .setTitle(`<:analytics:994948046314012772> I'm in \`${bot.guilds.cache.size}\` servers!`)
            .addField(`<:user:1013896589061926922> User Count`, `\`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
            .addField(`<:chat:995075584147345439> Channel Count`, `\`${bot.channels.cache.size} channels\``, true)
            .setFooter({
            text: `Asked by ${interaction.user.username} • ${interaction.guild.name}`,
            iconURL: interaction.user.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 2048,
            }),
            })
            .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0rCjAc6P3tpKw0u_10pXKDMJZppbfw72AGQ&usqp=CAU")
            .setColor("RANDOM")
            .setTimestamp();

        const row = new MessageActionRow() // Prettier
            .addComponents(
            new MessageButton() // Prettier
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=944572861874602054&permissions=1644971949559&scope=bot%20applications.commands`)
            .setEmoji(`<a:verifyred:994197138504417310>`)
            .setLabel("Invite me!")
            .setStyle("LINK")
            );
        interaction.followUp({ embeds: [embed], components: [row] });
        } catch (err) {
        console.log(err);
        return interaction.followUp({content: `❌ I am unable to track my guilds please try later`})
        }
    }
};