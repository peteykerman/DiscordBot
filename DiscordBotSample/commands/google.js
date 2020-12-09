exports.run = (client, message, args) => {
    const   googleIt = require('google-it')
    const   query = args.join(' ')

    if( !query )  {
        message.channel.send(`Please use a search query, example: !google query goes here.`);
        return;
    }

    googleIt({'query': query, 'no-display': true})
        .then(results => {
            message.channel.send(results[0].link)
        })
        .catch(console.error);
}