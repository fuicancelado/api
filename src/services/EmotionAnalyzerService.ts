import { toneAnalyzer } from '../config/ToneAnalyzer'
import ISearchResult from '../models/ISearchResult'

class EmotionAnalyzerService {
  async analyze(searchResult: ISearchResult[]): Promise<unknown> {
    const phrases = searchResult.map(item => item.text)
    const formattedPhrases = phrases.join('\n')

    const {
      result: { document_tone },
    } = await toneAnalyzer.tone({ toneInput: { text: formattedPhrases }, sentences: true })

    return document_tone.tones
  }
}

export { EmotionAnalyzerService }
