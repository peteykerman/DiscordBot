exports.run = (client, message, args) => {
    const   fs = require('fs');

    fs.readFile('boomers.json', 'utf8' , (err, data) => {
        // Check for error
        if (err) {
            console.error(err)
            return
        }
        let boomers = JSON.parse(data);
        boomers.sort((a,b) => parseFloat(b.points) - parseFloat(a.points));
        
        let boomerList = '';
        boomers.forEach( (boomer, index) => {
            index = index + 1;
            boomerList += `${boomer.points} Boomer Points : ${boomer.name}\n`;
        });
        message.channel.send(`${boomerList}`);
    })
}