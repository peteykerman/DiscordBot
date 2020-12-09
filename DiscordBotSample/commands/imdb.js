exports.run = (client, message, args) => {
    const Discord   = require('discord.js');
    const imdb      = require('imdb-api')
    const search    = args.join(' ')

    // Return if no search param 
    if( !search ) return message.channel.send(`No search param found: !imdb movie name.`);

    imdb.search({name: search}, {apiKey: 'db6b8092'})
        .then( data => {
            const titles = data.results.slice(0,3)

            titles.forEach( title => {
                const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(title.title)
                .setURL(`https://www.imdb.com/title/${title.imdbid}`)
                .setDescription(`Type: ${title.type}`)
                .setThumbnail(title.poster)
                .addField('Year', title.year, true);

                message.channel.send(exampleEmbed);
            })
        })
        .catch( error => {
            message.channel.send(error.message);
        });
}