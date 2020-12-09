exports.run = (client, message, args) => {
    const   fs = require('fs');

    // Get user by name
    const nameArgs  = args.join(' ');
    const user      = client.users.cache.find(user => user.username.toLowerCase() == nameArgs.toLowerCase());

    // Return if no user found by that name
    if( !user ) return message.channel.send(`No user found. Please provide a username or make sure the username is correct.`);

    // Set username
    const username  = user.username;

    fs.readFile('boomers.json', 'utf8' , (err, data) => {
        // Check for error
        if (err) {
            console.error(err)
            return
        }

        // Check if data exists
        if (!data.length) {
            let boomers = [
                boomer = { 
                    name: username,
                    points: 1
                },
            ]

            // Write data to file
            let data = JSON.stringify(boomers, null, 2);
            fs.writeFile('boomers.json', data, { flag: 'a+' }, err => {});
        } 
        
        // If data exists
        else {
            let newData = JSON.parse(data);

            // Check if user exists in the data
            const userExists = newData.some(name => name.name === username);

            // If user exists add a +1 to their points
            if(userExists) {
                newData.filter( n => {  
                    if( n.name === username ) {
                        n.points = n.points + 1;
                        message.channel.send(`${n.name} now has ${n.points} boomer points.`);
                    }
                });
            } 
            // If user does not exists add them
            else {
                let boomer  = { 
                    name: username,
                    points: 1
                }
                newData.push(boomer);
                message.channel.send(`${username} now has 1 boomer points.`);
            }           

            // Write data to file
            let updatedData = JSON.stringify(newData, null, 2);
            fs.writeFileSync('boomers.json', updatedData);
        }
    })
}