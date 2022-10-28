const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
    name: "animal",
    description: `🐾 Get an animal image`,
    cooldown: 5,

    options: [
        {
            name: "dog",
            description: "🐶 Get a dog picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "cat",
            description: "🐱 Get a cat picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "fox",
            description: "🦊 Get a fox picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "panda",
            description: "🐼 Get a panda picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "red_panda",
            description: "🔴🐼 Get a red panda picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "koala",
            description: "🐨 Get a koala picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "bird",
            description: "🦜 Get a bird picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "raccoon",
            description: "🦝 Get a raccoon picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
        {
            name: "kangaroo",
            description: "🦘 Get a pand picture or gif and a fact about them",
            type: "SUB_COMMAND",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            const command = args[0]


            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | I'm generating a \`${command}\` picture/gif. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            if (command == "dog") {

                let res = await fetch("https://some-random-api.ml/animal/dog");

                let body = await res.json();

                //if(res.message != "")

                const embed = new MessageEmbed()
                    .setTitle(`🐶 Dog`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🐶 Dog • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "cat") {

                let res = await fetch("https://some-random-api.ml/animal/cat");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🐱 Cat`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🐱 Cat • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "fox") {

                let res = await fetch("https://some-random-api.ml/animal/fox");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🦊 Fox`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🦊 Fox • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "panda") {

                let res = await fetch("https://some-random-api.ml/animal/panda");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🐼 Panda`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🐼 Panda • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "red_panda") {

                let res = await fetch("https://some-random-api.ml/animal/red_panda");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🐾 Red Panda`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🐾 Red Panda • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "koala") {

                let res = await fetch("https://some-random-api.ml/animal/koala");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🐨 Koala`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🐨 Koala • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "bird") {

                let res = await fetch("https://some-random-api.ml/animal/bird");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🦜 Bird`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🦜 Bird • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "raccoon") {

                let res = await fetch("https://some-random-api.ml/animal/raccoon");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🦝 Raccoon`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🦝 Raccoon • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

            if (command == "kangaroo") {

                let res = await fetch("https://some-random-api.ml/animal/kangaroo");

                let body = await res.json();

                const embed = new MessageEmbed()
                    .setTitle(`🦘 Kangaroo`)
                    .setDescription(`> Did you know that : \`${body.fact}\``)
                    .setImage(body.image)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `🦘 Kangaroo • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.image);

                interaction.editReply({ embeds: [embed] });

            }

        } catch (err) {
            console.log(err);

            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] }) || interaction.followUp({ embeds: [basicError] })
        }
    },
};