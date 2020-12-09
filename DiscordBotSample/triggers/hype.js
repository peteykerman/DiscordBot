const giphy = require('../services/giphy');
const { randomFromArray } = require('../utilities/random');
const QUERIES = [
  'hype',
  'let\'s fucking go'
];

exports.triggers = [
  'let\'s fucking go',
  'lets fucking go',
  'lets go',
  'let\'s go',
  'hype',
  'such hype',
  'fucking hype'
];

exports.action = (client, message) => {
  giphy.getRandom(randomFromArray(QUERIES))
    .then(res => message.channel.send(res))
    .catch(err => console.error(err));
};
