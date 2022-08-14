require('dotenv').config();
const { Client } = require('discord.js');
const mongoose = require('mongoose');
const { Intents, MessageEmbed } = require('discord.js');
const economy = require('../models/EconomyModel');
const ItemManager = require('./ItemManager');
const SkillManager = require('./SkillManager');
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');


class MongoClient extends Client {
    constructor() {
        super({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]});
        const uri = "mongodb+srv://nounour:12345@cluster0.pirj0.mongodb.net/?retryWrites=true&w=majority";
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB')
        this.economy = economy;
        this.items = new ItemManager();
        this.skills = new SkillManager();
        this.commandsUsed = 1;
    }

    /**
     * 
     * @param {string} userId - A discord user ID.
     */

    async fetchUser(userId) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        const user = await economy.findOne({ userId: userId });
        if (!user) {
            const newUser = new economy({
                userId: userId,
                items: [],
                skills: []
            });
            newUser.save();
            return newUser;
        }
        return user;
    }

    /**
     * 
     * @param {string} userId - A discord user ID.
     * @param {number} amount - Amount of bank space to give.
     */

    async giveBankSpace(userId, amount) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        let user = await economy.findOne({ userId: userId });
        if (!user) {
            const newUser = new economy({
                userId: userId,
                items: [],
                skills: []
            });
            newUser.save();
            return newUser;
        }
        user.bankSpace += parseInt(amount);
        await user.save();
        return user;
    }

    /**
     * 
     * @param {string} userId - A discord user ID.
     */

    async createUser(userId) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        const user = await economy.findOne({ userId: userId });
        if (!user) return false;
        const newUser = new economy({
            userId: userId,
            items: [],
            skills: []
        });
        newUser.save();
        return newUser;
    }

    /**
     * 
     * @param {string} userId - A discord user ID.
     * @param {number} amount - Amount of coins to give.
     */

    async giveCoins(userId, amount) {
        const someone = this.users.cache.get(userId);
        if (!someone || someone.bot) return false;
        let user = await economy.findOne({ userId: userId });
        if (!user) {
            const newUser = new economy({
                userId: userId,
                items: [],
                skills: [],
                coinsInWallet: parseInt(amount)
            });
            newUser.save();
            return newUser;
        }
        user.coinsInWallet += parseInt(amount);
        await user.save();
        return user;
    }



}

module.exports = MongoClient;