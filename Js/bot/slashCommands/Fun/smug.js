const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "smug",
    description: "😏 Smug at someone, with style",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "👤 The users",
            required: false,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let member = interaction.options.getUser("user") || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

            if (!member) {
                member = bot.user
            }
            
            if (member.id == interaction.user.id) {
                let authorUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You want to smug at yourself, you're realy a weirdo.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }
    


            const res = await fetch("https://nekos.life/api/v2/img/smug");
            const body = await res.json();
            const embed = new MessageEmbed() // Prettier
                .setAuthor({
                    name: `😏 Tsssk...`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`>>> 😏 <@${interaction.member.id}> gived a smug look to <@${member.id || member.user.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| The, they, they smu, smug at , me, me too... please let me out||" : ""}`)
                .setImage(body.url)
                .setColor("RANDOM")
                .setFooter({
                    text: `😏 Smug • Asked by ${interaction.member.nickname}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setURL(body.url);
            interaction.followUp({ embeds: [embed] });
        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};