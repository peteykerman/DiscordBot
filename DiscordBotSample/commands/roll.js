exports.run = (client, message, args) => {
    const dice = !args.length ? 100 : args[0];    
    const max = parseInt(dice, 10);
    const roll = Math.floor(Math.random() * max + 1);
    
    if (dice != parseInt(dice, 10) || dice == 0){
        message.channel.send(`${message.author} tried to roll an impossible die.`);
        return;
    }
    message.channel.send(`${message.author.username} rolled a ${roll} out of ${max}`);
}