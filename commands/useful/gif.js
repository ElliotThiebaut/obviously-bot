const axios = require('axios');

module.exports = {
	name: 'gif',
	description: 'Rechercher un gif sur Tenor',
    args: true,
    usage: '<mot-clé 1> <mot-clé 2> [...]',
    guildOnly: false,
    cooldown: 5,
    aliases: ['giphy', 'tenor'],

	async execute(message, args) {
		let keywords = '';
        keywords = args.join(" ");

        let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=off`;

        let response = await axios.get(url);
        let data = response.data;
        let index = Math.floor(Math.random() * data.results.length)

        message.channel.send(data.results[index].url);
	},
};