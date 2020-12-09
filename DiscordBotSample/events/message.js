const sanitize = require('../utilities/sanitize');

module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    const { content } = message;

    // handle messages using prefilx
    if (content.startsWith(client.config.prefix)) {
        // Standard argument/command name def
        const args = content.slice(client.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // Grab the command data from the client.commands Enmap
        const cmd = client.commands.get(command);

        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;

        // Run the command
        cmd.run(client, message, args);
    } else {
        // parse for triggers
        client.triggers.forEach(trigger => {
            if (
                trigger.triggers.some(t => sanitize(content).includes(t))
            ) trigger.action(client, message);
        });
    }
}
