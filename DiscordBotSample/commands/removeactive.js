exports.run = (client, message, args) => {
    let username = message.author.username;

    const index = client.activeUsers.findIndex(item => item.user == username);

    // If name already exists in array, remave & notify 
    if (index != -1) {
        client.activeUsers.splice(index, 1);        
        message.channel.send(`${message.author} is no longer active`);
    } else {
        // If user is not currently active, let them know
        message.channel.send(`${message.author} you are not set to active, type !setactive `);
    }
}