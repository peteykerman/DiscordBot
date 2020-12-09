const { random } = require('../services/giphy');

exports.run = (client, message, args) => {
    const   { randomFromArray } = require('../utilities/random');
    const   audioFolder = './audio/';
    const   fs = require('fs');

    fs.readdir(audioFolder, (err, files) => {
        const voiceChannel = message.member.voice.channel;

        if( !voiceChannel ) {
            message.channel.send(`You must be in a voice channel to use this command.`);
            return;
        }

        voiceChannel.join()
            .then(connection => {
                let randomAudio  = randomFromArray(files).replace('.mp3', '');
                message.channel.send(`Playing ${randomAudio}.`);
                const dispatcher = connection.play(`./audio/${randomAudio}.mp3`);
                dispatcher.on('finish', () => {
                    voiceChannel.leave();
                });
            })
            .catch(console.error);
    });
}