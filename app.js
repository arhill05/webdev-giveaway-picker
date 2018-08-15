const axios = require('axios');
const https = require('https');

const instance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

const url =
  'https://www.reddit.com/r/webdev/comments/93o4lf/august_2018_rwebdev_giveaway/.json?depth=1';

getRandom = maxValue => {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

uniqueFilter = (val, index, arr) => {
  return arr.indexOf(val) === index;
};

getWinner = async () => {
  let redditResponse = null;
  try {
    redditResponse = await instance.get(url);
  } catch (err) {
    console.log(err);
  }

  let comments = redditResponse.data.map(listing =>
    listing.data.children.filter(child => child.kind === 't1')
  );

  const authors = []
    .concat(...comments)
    .map(comment => comment.data.author)
    .filter(uniqueFilter);

  const rand = getRandom(authors.length);
  const winner = authors[rand];
  console.log(winner);
};

getWinner();
