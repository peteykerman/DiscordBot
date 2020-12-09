const apiKey = require('../config.json').giphy;
const giphy = require('giphy-api')(apiKey);
const { randomFromArray } = require('../utilities/random');

module.exports = giphy;

module.exports.getRandom = (query, limit = 20) => {
  return giphy.search({
    q: query,
    limit
  }).then(res => randomFromArray(res.data).url);
};
