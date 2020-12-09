exports.run = (client, message, args) => {
    const   fetch = require('node-fetch');
    const   subreddit = args.join(' ');

    if( !subreddit )  {
        message.channel.send(`Please provide a subreddit. !reddit valorant`);
        return;
    }

    const   url   = `https://api.reddit.com/r/${subreddit}/hot.json?limit=1`;

    fetch(url)
        .then(response => response.json())
        .then (
            data => {
                let children = data.data.children;
                children.filter(post => {
                    
                    if( post.data.stickied != true && post.data.over_18 == true ) {
                        message.channel.send(`Nice try pervert.`);
                        return;
                    }

                    if( post.data.stickied != true ) {
                        let permalink = post.data.permalink
                        message.channel.send(`https://reddit.com${permalink}`);
                    }
                })
            }
        )
        .catch(
            err => {
                console.log(err);
                message.channel.send('Error: Incorrect subreddit name.');
            }
        );
}