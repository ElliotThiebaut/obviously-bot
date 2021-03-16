const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Liste de toutes les commandes ou plus d\'informations sur l\'une d\'elle',
	aliases: ['commands'],
	usage: '<nom de la commande>',
	cooldown: 1,
    guildOnly: false,
    args: false,

	execute(message, args) {
		const data = [];
        const { commands } = message.client;
        
        if (!args.length) {
            data.push('Voici une liste de mes commandes:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nVous pouvez saisir \`${prefix}help <nom de la commande>\` pour avoir des informations sur une commande spécifique`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Je t\'ai envoyé un DM avec toutes mes commandes !');
                })
                .catch(error => {
                    console.error(`Impossible d'envoyer un DM à ${message.author.tag}.\n`, error);
                    message.reply('Il semblerait que je puisse pas t\'envoyer de DM. As tu désactiver tes DM ?');
                });
        }
        
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Ce n\'est pas une commande valide');
        }

        data.push(`**Nom:** ${command.name}`);

        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Utilisation:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} seconde(s)`);

        message.channel.send(data, { split: true });
	},
};