const { MessageEmbed } = require("discord.js");
const axios = require("axios");



module.exports = {
    name: "football",
    description: `⚽️ Get football info`,
    cooldown: 5,
    /*options: [
        {
            name: "match"
        }
    ],*/

    run: async (bot, interaction, args) => {

        try {

            const options = {
                method: 'GET',
                url: 'https://api.football-data.org/v4/matches',
                //params: { sname: `${user1.username}`, fname: `${user2.username}` },
                headers: {
                    'X-Auth-Token': '6a59373622ca4671aab030e5fc9087db',
                }
            };

            axios.request(options).then(function (response) {

                console.log(response.data.matches)

            })

            interaction.followUp({content: "🚧 Under devlopment"})


        } catch (err) {
            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }

    }

}