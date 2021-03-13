module.exports = {
	name: 'issou',
	description: 'Connects to voice chat and plays Issou !',
	args: false,
	usage: '',
	guildOnly: true,
	cooldown: 1,
	aliases: ['risitas'],

	execute(message, args) {
		message.channel.send('Issou');
	},
};