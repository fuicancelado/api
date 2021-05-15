import { Request, Response } from 'express'

import { searchLoop, ICustomParams, IStatuses } from '../config/TwitterApi'

export interface INeededFields {
  phrase_id: string
  original_text: string
  type: 'tweet'
  language: string
  user: {
    name: string
    profile_image: string
    nickname: string
  }
  tweet: {
    url: string
    created_at: Date
  }
}

class SearchController {
  mapFields(results: IStatuses[]): INeededFields[] {
    return results.map(item => {
      const {
        id_str: phrase_id,
        created_at,
        metadata: { iso_language_code: language },
        user: { name: user_name, profile_image_url: user_profile_image, screen_name: user_nickname },
        full_text,
        text,
        entities: { urls },
      } = item

      const original_text = text || full_text || ''
      const tweet_url = urls?.[0]?.url || ''

      const type = 'tweet'

      const user = { name: user_name, profile_image: user_profile_image, nickname: user_nickname }
      const tweet = {
        url: tweet_url,
        created_at: new Date(created_at),
      }

      return { phrase_id, original_text, type, language, user, tweet }
    })
  }

  async listSearch(request: Request, res: Response): Promise<Response> {
    try {
      const { searchItem } = request.query

      const params: ICustomParams = { q: `${searchItem}`, exclude: 'retweets', result_type: 'mixed', count: 100 }
      const results = await searchLoop('search/tweets', params)

      const neededFields = this.mapFields(results)

      return res.json(neededFields)
    } catch (err) {
      return res.status(400).json({ message: 'Something bad happened...' })
    }
  }
}

export { SearchController }
