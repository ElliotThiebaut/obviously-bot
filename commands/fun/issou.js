const fs = require('fs');

module.exports = {
	name: 'issou',
	description: 'Connects to voice chat and plays Issou !',
	args: false,
	usage: '<volume> OR <user> <volume>',
	guildOnly: true,
	cooldown: 2,
	aliases: ['risitas'],

	async execute(message, args) {
		
		const guild = message.client.guilds.cache.get(message.guild.id);
		let member = guild.members.cache.get(message.author.id);
		let mentions = message.mentions.users.array();
		let volume = 0.8;

		message.delete();
		
		
		if (mentions[0] && !mentions[1]) {

			member = guild.members.cache.get(message.mentions.users.first().id)
		} else if (mentions[1]) {

			message.reply('Only one member can be mentionned !')
		}

		function isNumeric(str) {
			if (typeof str != "string") return false // we only process strings!  
			return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
				   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
		  }

		if (member.voice.channel) { 

			
			if (isNumeric(args[0]) ) {
				volume = args[0]
			} else if (isNumeric(args[1])) {
				volume = args[1]
			}
			
			const connection = await member.voice.channel.join();
			const dispatcher = connection.play(fs.createReadStream('ressources/audio/issou.mp3'), { volume: volume });

			dispatcher.on('finish', () => {
				connection.disconnect();
			});

			dispatcher.on('error', console.error);
				
		} else {
			
			message.reply('Il faut que la cible soit connecté dans un salon vocal !')
		};
	},
};