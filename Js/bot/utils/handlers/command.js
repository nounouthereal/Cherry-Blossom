const fs = require('fs');
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = bot => {
    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/economy', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/economy/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/info', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/info/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/fun-utility', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/fun-utility/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/games', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/games/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/moderation', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/moderation/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/utility', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/utility/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/moderation', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/moderation/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands', (err, dic, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/utility/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });



    const globPromise = promisify(glob);


    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );

    slashCommands.map((value) => {
        const file = require(value);
        bot.commands.set(file.config.name, file);
        console.log(`[Text] Command ${file?.config.name} loaded.`)
        if (!file?.name) return;
        bot.slashCommands.set(file.name, file);

        arrayOfSlashCommands.push(file);
    });
    bot.on("ready", async () => {
        bot.guilds.cache
        .get("974767284855910410")
        .commands.set(arrayOfSlashCommands);
    })



    //Waiting for ranking system V1.0
    /* fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/ranking', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/ranking/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    }); */

}
