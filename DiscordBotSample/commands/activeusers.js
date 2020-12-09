exports.run = (client, message, args) => {
    //const ACTIVE_TIME = 5000;    
    const checkTime = new Date().getTime();

    client.activeUsers = client.activeUsers.filter(item => item.time + client.ACTIVE_TIME > checkTime);
    let count = client.activeUsers.length;

    if (count == 0) {
        message.channel.send(`There are no active bruvs currently.`);
        return;
    }

    let active = '';
    for (var i = 0; i < count; i++) {
        active += client.activeUsers[i].user + ', '
    }
    active = active.substring(0, active.length - 2);
    message.channel.send(`Current active bruvs: ${active}`);
    
}