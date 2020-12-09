exports.run = (client, message, args) => {
    const audioFolder = './audio/';
    const fs = require('fs');
    fs.readdir(audioFolder, (err, files) => {
        let filelist = '';
        files.length && files.forEach(file => {
            const audioFile = file.replace('.mp3', '');
            filelist += `${audioFile}\n`;
        });
        message.channel.send(`${filelist}`);
    });
}