import { Request, Response } from 'express'

import { CancelometerService } from '../services/CancelometerService'
import { EmotionAnalyzerService } from '../services/EmotionAnalyzerService'
import { SearchService } from '../services/SearchService'
import { TranslationService } from '../services/TranslationService'

class SearchController {
  searchService: SearchService

  emotionAnalyzer: EmotionAnalyzerService

  translationService: TranslationService

  cancelometerService: CancelometerService

  constructor() {
    this.searchService = new SearchService()
    this.emotionAnalyzer = new EmotionAnalyzerService()
    this.translationService = new TranslationService()
    this.cancelometerService = new CancelometerService()
  }

  async listSearch(request: Request, res: Response): Promise<Response> {
    try {
      const { searchItem } = request.query

      const searchResult = await this.searchService.listSearch(searchItem as string)
      const translationResult = await this.translationService.translate(searchResult)
      const tones = await this.emotionAnalyzer.analyze(translationResult)
      const cancelometer = this.cancelometerService.calculate(tones)

      return res.json({ results: translationResult, tones, cancelometer })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'Something bad happened...' })
    }
  }
}

export { SearchController }
