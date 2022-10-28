


const { MessageAttachment, MessageEmbed } = require('discord.js')
const axios = require("axios")



module.exports = {
    name: "fortnite",
    description: "🎮 Fortnite {FN}",
    cooldown: 5,
    options: [
        {
            name: "shop",
            description: "🛒 See today fortnite shop",
            type: "SUB_COMMAND",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            async function getMatch(playerID) {
                try {
                    trackerMatch = await axios.get(process.env.TRACKER_MATCH + `${playerID}`);
                } catch (error) {
                    if (error.response.status === 403) {
                        return '403_error';
                    }
                    return 'default_error';
                }
                return trackerMatch;
            }

            var headers = {
                "TRN-Api-Key": "cf249427-2407-4657-b792-b53be705fb93"
            }

        
            const res = await fetch("https://api.fortnitetracker.com/v1/store", {headers: headers})
            const body = await res.json();

            console.log(body)




            //interaction.followUp({files: [attachment] });

        } catch (err) {

            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })

        }
    }
}
