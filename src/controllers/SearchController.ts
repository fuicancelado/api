import { Request, Response } from 'express'

import { ICustomParams } from '../config/TwitterApi'
import { EmotionAnalyzerService } from '../services/EmotionAnalyzerService'
import { SearchService } from '../services/SearchService'

class SearchController {
  searchService: SearchService

  emotionAnalyzer: EmotionAnalyzerService

  constructor() {
    this.searchService = new SearchService()
    this.emotionAnalyzer = new EmotionAnalyzerService()
  }

  async listSearch(request: Request, res: Response): Promise<Response> {
    try {
      const { searchItem } = request.query

      const params: ICustomParams = { q: `${searchItem}`, exclude: 'retweets', result_type: 'mixed', count: 100 }

      const searchResult = await this.searchService.listSearch(params)

      const phrases = searchResult.map(item => {
        return item.original_text
      })

      const analyzeResult = await this.emotionAnalyzer.analyze(phrases)

      return res.json(analyzeResult)
    } catch (err) {
      return res.status(400).json({ message: 'Something bad happened...' })
    }
  }
}

export { SearchController }
