import 'dotenv/config'

import Twit from 'twit'

const { API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env

const Twitter = new Twit({
  consumer_key: <string>API_KEY,
  consumer_secret: <string>API_KEY_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
})

export { Twitter }
