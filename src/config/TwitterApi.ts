import Twit, { Params } from 'twit'

import queryStringToJson from '../utils/queryStringToJson'

const { TWITTER_API_KEY, TWITTER_API_KEY_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET } = process.env

const TwitterAPI = new Twit({
  consumer_key: <string>TWITTER_API_KEY,
  consumer_secret: <string>TWITTER_API_KEY_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
})

export interface IStatuses {
  id: number
  id_str: string
  created_at: string
  full_text?: string
  text?: string
  metadata: {
    iso_language_code: string
  }
  user: {
    name: string
    screen_name: string
    profile_image_url: string
  }
  entities: {
    urls?: {
      url?: string
    }[]
  }
}

interface ISearchMetadata {
  query: string
  next_results: string
}

export interface ISearchResponse {
  statuses: IStatuses[]
  search_metadata: ISearchMetadata
}

export interface ICustomParams extends Params {
  count: number
  exclude: 'retweets' | 'replies'
}

export const search = (path: string, params?: ICustomParams): Promise<ISearchResponse> => {
  return new Promise((resolve, reject) => {
    TwitterAPI.get(path, params as ICustomParams, (err, data, _) => {
      if (err) reject(err)

      resolve(data as ISearchResponse)
    })
  })
}

export const searchLoop = async (path: string, params: ICustomParams, recursiveResult: IStatuses[] = []): Promise<IStatuses[]> => {
  const { search_metadata, statuses } = await search(path, params)
  const { next_results } = search_metadata

  const totalResults = recursiveResult.concat(statuses)

  if (!next_results || recursiveResult.length >= params.count) return totalResults.slice(0, params.count)

  const nextParams = queryStringToJson(next_results) as ICustomParams

  return searchLoop(path, nextParams, totalResults)
}

export default TwitterAPI
