const fs = require('fs');

module.exports = {
	name: 'issou',
	description: 'Connects to voice chat and plays Issou !',
	args: false,
	usage: '',
	guildOnly: true,
	cooldown: 2,
	aliases: ['risitas'],

	async execute(message, args) {
		
		const guild = message.client.guilds.cache.get(message.guild.id)
		let member = guild.members.cache.get(message.author.id)
		let mentions = message.mentions.users.array()
		
		
		if (mentions[0] && !mentions[1]) {

			member = guild.members.cache.get(message.mentions.users.first().id)
		} else if (mentions[1]) {

			message.reply('Only one member can be mentionned !')
		}

		if (member.voice.channel) { 
			
			const connection = await member.voice.channel.join();
			const dispatcher = connection.play(fs.createReadStream('ressources/audio/issou.mp3'), { volume: 0.5 });

			dispatcher.on('finish', () => {
				connection.disconnect();
			});

			dispatcher.on('error', console.error);
				
		} else {
			
			message.reply('Il faut que la cible soit connecté dans un salon vocal !')
		};
	},
};