exports.run = (client, message, args) => {
    message.channel.messages.fetchPinned()
        .then(messages => {
            const pin = Array.from(messages)
                .map(m => m[1])[Math.floor(Math.random() * messages.size)];

            message.channel.send(`Random Pin: ${pin.content} - ${pin.author.username}`);
        })
        .catch(console.error);
}
