import { searchLoop, ICustomParams, IStatuses } from '../config/TwitterApi'

export interface INeededFields {
  original_text: string
  type: 'tweet'
  language: string
  user: {
    name: string
    profile_image: string
    nickname: string
  }
  tweet: {
    id: number
    id_str: string
    url: string
    created_at: Date
  }
}

class SearchService {
  mapFields(results: IStatuses[]): INeededFields[] {
    return results.map(item => {
      const {
        id,
        id_str,
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
        id,
        id_str,
        url: tweet_url,
        created_at: new Date(created_at),
      }

      return { original_text, type, language, user, tweet }
    })
  }

  async listSearch(params: ICustomParams): Promise<INeededFields[]> {
    const results = await searchLoop('search/tweets', params)

    return this.mapFields(results)
  }
}

export { SearchService }
