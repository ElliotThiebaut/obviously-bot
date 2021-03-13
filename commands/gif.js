const axios = require('axios');

module.exports = async (msg, args) => {

    let keywords = 'risitas';
    if (args.length > 0) {
        keywords = args.join(" ");
    }

    let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=off`;

    let response = await axios.get(url);
    let data = response.data;
    let index = Math.floor(Math.random() * data.results.length)

    msg.channel.send(data.results[index].url);
}