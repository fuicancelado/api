import { Request, Response } from 'express'

import { searchLoop, ICustomParams } from '../config/TwitterApi'

class SearchController {
  async listSearch(request: Request, res: Response): Promise<Response> {
    const { searchItem } = request.query

    const params: ICustomParams = { q: `${searchItem}`, exclude_replies: true, result_type: 'popular', count: 100 }

    const results = await searchLoop('search/tweets', params)

    return res.json(results)
  }
}

export { SearchController }
