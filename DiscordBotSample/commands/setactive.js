exports.run = (client, message, args) => {
    let username = message.author.username;
    const checkTime = new Date().getTime();
    client.activeUsers = client.activeUsers.filter(item => item.time + client.ACTIVE_TIME > checkTime);

    //Check whether user is already active
    const index = client.activeUsers.findIndex(item => item.user == username);
    if (index != -1) {
        client.activeUsers[index].time = new Date().getTime();
        message.channel.send(`${message.author} is already active. Timer has been reset.`);
        return;
    }    

    // Add user to active users
    client.activeUsers.push({ user: username, time: new Date().getTime() });    
    
    // Message channel that user is now active
    message.channel.send(`${message.author} is now set to active`);    
}