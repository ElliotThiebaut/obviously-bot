const issou = require('./commands/issou');
const gif = require('./commands/gif');

const commands = { issou, gif}


module.exports = async (msg) => {
    let tokens = msg.content.split(' ')
    let command = tokens.shift();

    if (command.charAt(0) === '!') {
        command = command.substring(1);
        commands[command](msg, tokens);
    }
}