import { Request, Response } from 'express'

import { ICustomParams } from '../config/TwitterApi'
import { SearchService } from '../services/SearchService'

class SearchController {
  searchService: SearchService

  constructor() {
    this.searchService = new SearchService()
  }

  async listSearch(request: Request, res: Response): Promise<Response> {
    try {
      const { searchItem } = request.query

      const params: ICustomParams = { q: `${searchItem}`, exclude: 'retweets', result_type: 'mixed', count: 100 }

      const result = await this.searchService.listSearch(params)

      return res.json(result)
    } catch (err) {
      return res.status(400).json({ message: 'Something bad happened...' })
    }
  }
}

export { SearchController }
