const { MessageEmbed } = require("discord.js");
const { dependencies } = require("../../../../package.json");

module.exports = async (bot, interaction, args) => {
    console.log(Object.keys(dependencies))
    const embed = new MessageEmbed()
        .setTitle(`📦 Dependencies`)
        .setDescription(`> <@${bot.user.id}> runs on ${Math.round(Object.keys(dependencies).length / 2)} [NPM packages](https://www.npmjs.com) (Javascript >>> Typescript!)`)
        .setTimestamp()
        .setImage("https://i.redd.it/n08d5h8v4id21.jpg")
        .setColor("#57c478")
        .setFooter({
            text: `Asked by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 2048,
            }),
        });
    interaction.followUp({ embeds: [embed] });
};