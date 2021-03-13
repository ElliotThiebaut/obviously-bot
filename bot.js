require("dotenv").config();
const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log("🚀 Ready to roll 🚀");
});

client.on('message', async (msg) => {

    let args = msg.content.split(' ')

    if (args[0] === '!gif') {
        let keywords = 'risitas';
        if (args.length > 1) {
            keywords = args.slice(1, args.length).join(" ");
        }

        let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=off`;
        
        let response = await axios.get(url);
        let data = response.data;
        let index = Math.floor(Math.random() * data.results.length)

        msg.channel.send(data.results[index].url);
    }
})