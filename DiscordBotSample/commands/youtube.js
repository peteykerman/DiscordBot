exports.run = (client, message, args) => {
    const YouTube           = require('simple-youtube-api');
    const youtube           = new YouTube(client.config.youtube);
    const youtubeurl        = 'https://www.youtube.com/watch?v=';

    youtube.searchVideos(args, 4)
        .then(results => {
            message.channel.send(`${youtubeurl}${results[0].id}`)
        })
        .catch( error => message.channel.send(`Video not found, try again.`) );
}