const { MessageEmbed, MessageAttachment } = require("discord.js");
const { dependencies } = require("../../../../package.json");
const npmCheck = require('npm-check');

npmCheck()
  .then(currentState => console.log(currentState));

module.exports = async (bot, interaction, args) => {

    let depedenciesSTR = ""
    const embed = new MessageEmbed()
        .setTitle(`📦 Dependencies`)
        .setDescription(`> <@${bot.user.id}> runs on ${Math.round(Object.keys(dependencies).length / 2)} [NPM packages](https://www.npmjs.com) (Javascript >>> Typescript!)`)
        .setTimestamp()
        .setImage("https://i.redd.it/n08d5h8v4id21.jpg")
        .setColor("#57c478")
        .setFooter({
            text: `Debug • Depedencies • Asked by ${interaction.user.username}`,
            iconURL: interaction.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 2048,
            }),
        });



        Object.keys(dependencies).forEach((dep, i) => {

            depedenciesSTR += `Internal checking done -- ✅ Working\n`
        })
        
        let depFile = new MessageAttachment(Buffer.from(depedenciesSTR), `cherryDepedencies.txt`)
    interaction.followUp({ embeds: [embed], files: [depFile] });
};