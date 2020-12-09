const giphy = require('../services/giphy');
const { randomFromArray } = require('../utilities/random');
const QUERIES = [
  'rip',
  'rest in peace',
  'dead',
  'its dead'
];

exports.triggers = [
  'clan ded',
  'clan dead',
  'rip clan'
];

exports.action = (client, message) => {
  giphy.getRandom(randomFromArray(QUERIES))
    .then(res => message.channel.send(res))
    .catch(err => console.error(err));
};
