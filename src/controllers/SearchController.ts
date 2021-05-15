import { Request, Response } from 'express'

import { Twitter } from '../config/TwitConfiguration'

class SearchController {
  async listSearch(request: Request, res: Response): Promise<void> {
    const { searchItem, searchDate } = request.body

    Twitter.get('search/tweets', { q: `${searchItem} since:${searchDate}`, count: 2 }, (err, data, _) => {
      const tweets = data

      return res.json(tweets)
    })
  }
}

export { SearchController }
