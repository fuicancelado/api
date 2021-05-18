import { toneAnalyzer } from '../config/ToneAnalyzer'
import ISearchResult from '../models/ISearchResult'

class EmotionAnalyzerService {
  async analyze(searchResult: ISearchResult[]): Promise<unknown> {
    const phrases = searchResult.map(item => {
      return `${item.id}${item.text}`
    })

    const formattedPhrases = phrases.join('\n')

    const {
      result: { sentences_tone },
    } = await toneAnalyzer.tone({ toneInput: { text: formattedPhrases }, sentences: true })

    return { sentences_tone }
  }
}

export { EmotionAnalyzerService }
