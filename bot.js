require("dotenv").config();
const Discord = require('discord.js');
const commandHandler = require('./commands')

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log("🚀 Ready to roll 🚀");
});

client.on('message', commandHandler)