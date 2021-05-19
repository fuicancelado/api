import { v4 } from 'uuid'

import { searchLoop, ICustomParams, IStatuses } from '../config/TwitterApi'
import ISearchResult from '../models/ISearchResult'

class SearchService {
  mapFields(results: IStatuses[]): ISearchResult[] {
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

      return { id: v4(), original_text, text: original_text, type, language, user, tweet }
    })
  }

  async listSearch(searchItem: string): Promise<ISearchResult[]> {
    const params: ICustomParams = { q: `${searchItem}`, exclude: 'retweets', result_type: 'mixed', count: 100, lang: 'pt' }

    const results = await searchLoop('search/tweets', params)

    return this.mapFields(results)
  }
}

export { SearchService }
