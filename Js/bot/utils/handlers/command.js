const fs = require('fs');
const { glob } = require("glob");
const { promisify } = require("util");

module.exports = async (bot) => {

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Economy', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Economy/${f}`);
            bot.commands.set(pull.config?.name, pull);
            console.log(`Commande ${pull.config?.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config?.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/General', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/General/${f}`);
            bot.commands.set(pull.config?.name, pull);
            console.log(`Commande ${pull.config?.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config?.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Fun', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Fun/${f}`);
            bot.commands.set(pull.config?.name, pull);
            console.log(`Commande ${pull.config?.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config?.name));
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
            bot.commands.set(pull.config?.name, pull);
            console.log(`Commande ${pull.config?.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config?.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Moderation', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Moderation/${f}`);
            bot.commands.set(pull.config.name, pull);
            console.log(`Commande ${pull.config.name} loaded`)
            pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        });
    });

    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Utility', (err, files) => {
        if (err) console.log(err);
        const file = files.filter(f => f.split('.').pop() === 'js');
        if (file.length < 1) {
            return console.log('No Commands.');
        }

        file.forEach(f => {
            const pull = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/commands/Utility/${f}`);
            bot.commands.set(pull.config?.name, pull);
            console.log(`Commande ${pull.config?.name} loaded`)
            pull.config?.aliases.forEach(alias => bot.aliases?.set(alias, pull.config?.name));
        });
    }); 



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
