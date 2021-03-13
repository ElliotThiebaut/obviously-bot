module.exports = {
	name: 'issou',
	description: 'Connects to voice chat and plays Issou !',
	execute(message, args) {
		message.channel.send('Issou');
	},
};