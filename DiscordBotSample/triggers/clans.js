const giphy = require('../services/giphy');
const sanitize = require('../utilities/sanitize');

exports.triggers = [
  'clans',
  'clan\'s',
  'clan is',
  'the clan is',
  'the clans',
  'the clan\'s'
];

exports.action = (client, message) => {
  let content = message.content.toLowerCase();

  client.triggers.forEach(trigger => {
    if ( trigger.triggers.some(t => sanitize(content).includes(t))) {
      let triggers     = trigger.triggers;
      let searchQuery  = '';

      triggers.forEach( word => {
        if ( content.includes(word) ) {
          searchQuery = content.replace(RegExp("\\b" + word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "\\b", "g"), '').trimStart()
        }
      });

      giphy.getRandom(searchQuery)
        .then(res => message.channel.send(res))
        .catch(err => console.error(err));
    }
  });
};
