const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch')


module.exports = {
    name: "Joke",
    description: "🤣 Get a joke",
    cooldown: 7,


    run: async (bot, interaction, args) => {

        try {

            const wait_embed = new MessageEmbed() 
                .setDescription(`<a:loading:1032282688821940245> | I'm generating a \`joke\`. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({embeds: [wait_embed]})


            const res = await fetch("http://icanhazdadjoke.com/", {
                method: "get",
                headers: {
                    Accept: "application/json",
                },
            });

            const body = await res.json();
            const embed = new MessageEmbed() // Prettier
                .setTitle(`🤣 Random Joke`)
                .setDescription(`>>> ${body.joke}`)
                .setColor("#1fb56d")
                .setFooter({
                    text: `Asked by ${interaction.member.nickname}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();

            interaction.editReply({ embeds: [embed] })
        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};
