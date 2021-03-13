require("dotenv").config();
const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log("🌈 Ready to roll 🌈");
});

client.on('message', async (msg) => {
    if (msg.content === 'issou') {
        msg.reply('Issouuuuuu')
    } else if (msg.content === '&gif') {
        
        let url = `https://g.tenor.com/v1/search?q=risitas&key=${process.env.TENOR_KEY}&limit=8`
        
    }
})