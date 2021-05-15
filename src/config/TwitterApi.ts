import Twit, { Params } from 'twit'

import queryStringToJson from '../utils/queryStringToJson'

const { API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env

const TwitterAPI = new Twit({
  consumer_key: <string>API_KEY,
  consumer_secret: <string>API_KEY_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
})

interface IStatuses {
  id_str: string
  created_at: string
  text: string
  metadata: {
    iso_language_code: string
  }
  user: {
    name: string
    screen_name: string
    profile_image_url: string
  }
  urls: {
    name: string
    screen_name: string
    profile_image_url: string
  }[]
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
}

export const search = (path: string, params?: ICustomParams): Promise<ISearchResponse> => {
  return new Promise((resolve, reject) => {
    TwitterAPI.get(path, params as ICustomParams, (err, data, _) => {
      if (err) reject(err)

      resolve(data as ISearchResponse)
    })
  })
}

const calculateNumberOfRequests = ({ count }: ICustomParams): number[] => {
  // default twitter api results per request
  const MAX_RESULTS_PER_REQUEST = 15

  const numberOfRequests = Math.ceil(count / MAX_RESULTS_PER_REQUEST) - 1
  const arrayRequests = Array.from(Array(numberOfRequests).keys())

  return arrayRequests
}

const loopUntilFinished = async (
  firstRequestResult: ISearchResponse,
  { path, params }: { path: string; params: ICustomParams },
): Promise<IStatuses[]> => {
  const { search_metadata, statuses } = firstRequestResult

  const requestQuantity = calculateNumberOfRequests(params)

  const { statuses: statusesResult } = await requestQuantity.reduce(async (acc, _) => {
    const { search_metadata, statuses } = await acc
    const { next_results } = search_metadata

    if (!next_results) return acc

    const paramsJSON = queryStringToJson(next_results)

    const searchResult = await search(path, paramsJSON as ICustomParams)

    const newStatuses = statuses.concat(searchResult.statuses)
    const newMetadata = searchResult.search_metadata

    return { search_metadata: newMetadata, statuses: newStatuses }
  }, Promise.resolve({ search_metadata, statuses }))

  const results = statusesResult.slice(0, params.count)

  return results
}

export const searchLoop = async (path: string, params: ICustomParams): Promise<IStatuses[]> => {
  const firstRequestResult = await search(path, params)

  return loopUntilFinished(firstRequestResult, { params, path })
}

export default TwitterAPI
