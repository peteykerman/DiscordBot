exports.run = (client, message, args) => {
    const   audioFolder = './audio/';
    const   fs = require('fs');
    const   fileName = args.join(' ');

    if( !fileName )  {
        message.channel.send(`Please request a filename. Example: !play hydra-slayer`);
        return;
    }

    fs.readdir(audioFolder, (err, files) => {
        if( !files.includes(`${fileName}.mp3`) ) {
            message.channel.send(`File '${fileName}' does not exist, use !audio to see the full list of audio files.`);
            return;
        }

        const voiceChannel = message.member.voice.channel;

        if( !voiceChannel ) {
            message.channel.send(`You must be in a voice channel to use this command.`);
            return;
        }
    
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.play(`./audio/${fileName}.mp3`);
                dispatcher.on('finish', () => {
                    voiceChannel.leave();
                });
            })
            .catch(console.error);
    });
}