import { Request, Response } from 'express'

import { EmotionAnalyzerService } from '../services/EmotionAnalyzerService'
import { SearchService } from '../services/SearchService'
import { TranslationService } from '../services/TranslationService'

class SearchController {
  searchService: SearchService

  emotionAnalyzer: EmotionAnalyzerService

  translationService: TranslationService

  constructor() {
    this.searchService = new SearchService()
    this.emotionAnalyzer = new EmotionAnalyzerService()
    this.translationService = new TranslationService()
  }

  async listSearch(request: Request, res: Response): Promise<Response> {
    try {
      const { searchItem } = request.query

      const searchResult = await this.searchService.listSearch(searchItem as string)
      const translationResult = await this.translationService.translate(searchResult)
      // const analyzerResult = await this.emotionAnalyzer.analyze(translationResult)

      return res.json(translationResult)
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'Something bad happened...' })
    }
  }
}

export { SearchController }
