const fs = require('fs')
const { glob } = require("glob");
const { promisify } = require("util");


const globPromise = promisify(glob);


let amount = 0

const arrayOfSlashCommands = [];

module.exports = async (bot) => {
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        console.log(`[Slash] Command ${file?.name} loaded.`)
        if (!file?.name) return;
        bot.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) {
            delete file.description
            console.log(`[Context] [${file.name}] loaded`)
        };
        arrayOfSlashCommands.push(file);
    });
    bot.on("ready", async () => {
        bot.guilds.cache
        .get("974767284855910410", "1015962784246276116")
        .commands.set(arrayOfSlashCommands);
    })
}