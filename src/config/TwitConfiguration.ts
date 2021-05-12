import Twit from 'twit';

require('dotenv/config');

const apikey = process.env.API_KEY;
const apiSecretkey = process.env.API_KEY_SECRET;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const T = new Twit({
  consumer_key: <string>apikey,
  consumer_secret: <string>apiSecretkey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

export { T };
