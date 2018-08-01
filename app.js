const axios = require('axios');

const url =
  'https://www.reddit.com/r/webdev/comments/93o4lf/august_2018_rwebdev_giveaway/.json?depth=1';

getRandom = maxValue => {
  return Math.floor(Math.random() * Math.floor(maxValue));
};

uniqueFilter = (val, index, arr) => {
  return arr.indexOf(val) === index;
};

getWinner = async () => {
  const redditResponse = await axios(url);

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
