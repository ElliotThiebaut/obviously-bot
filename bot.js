require("dotenv").config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


client.on('ready', () => {
    console.log("🚀 Ready to roll 🚀");
});

client.user.setActivity("with Risitas", {
    type: "COMPETING",
    url: "https://github.com/ElliotThiebaut/obviously-bot"
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('Je ne peux pas exécuter cette commande dans les DM !');
    }

    if (command.args && !args.length) {
        let reply = `Vous n'avez pas fournis d'arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nLe bon usage est: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`veuillez attendre ${timeLeft.toFixed(1)} seconde(s) de plus avant de réutiliser la commande \`${command.name}\``);
        }
    }

    timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Il y a eu un problème lors de l\'éxécution de cette commande');
	}
});



client.login(process.env.BOT_TOKEN);