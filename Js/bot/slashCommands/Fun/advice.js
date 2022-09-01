const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
    name: "advice",
    description: "🪢 Get an advice",
    cooldown: 5,
    

    run: async (bot, interaction, args) => {
     try {
      const res = await fetch("https://api.adviceslip.com/advice"),
       { slip } = await res.json();
      const embed = new MessageEmbed()
       .setTitle(`🤔 Advice`)
       .setDescription(`>>> ${slip.advice}`)
       .setColor("RANDOM")
       .setFooter({
        text: `Requested by ${interaction.member.nickname}`,
        iconURL: interaction.user.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        }),
       })
       .setThumbnail(
        interaction.user.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       );
      return interaction.followUp({ embeds: [embed] });
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
    },
   };