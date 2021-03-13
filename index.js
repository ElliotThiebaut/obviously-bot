const Discord = require('discord.js');

require("dotenv").config();
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log("🌈 Ready to roll 🌈");
});

client.on('message', (msg) => {
    if (msg.content === 'issou') {
        msg.reply('Issouuuuuu')
    }
})