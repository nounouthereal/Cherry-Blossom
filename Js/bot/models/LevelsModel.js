const mongoose = require("mongoose");

const levelSchema = mongoose.Schema({
    guildId: String,
    userId: String,
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    totalXp: { type: Number, default: 0 },
    xpToLevel: { type: Number, default: 123 },
    channel: { type: Array, default: null },
    activated: { type: Boolean, default: true },
    channelIgnore: { type: Array, default: true },
    roleIgnore: { type: Array, default: null }});

module.exports = mongoose.model("Levels", levelSchema);