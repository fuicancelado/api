import { toneAnalyzer } from '../config/ToneAnalyzer'
import ISearchResult from '../models/ISearchResult'
import ITone from '../models/ITone'

class EmotionAnalyzerService {
  setDefaultTones(tones: ITone[]): ITone[] {
    const emotions = ['anger', 'fear', 'joy', 'sadness', 'analytical', 'confident', 'tentative']

    return emotions.map(emotion => {
      const existingTone = tones.find(tone => tone.tone_id === emotion)

      return (
        existingTone || {
          score: 0,
          tone_id: emotion,
          tone_name: `${emotion.charAt(0).toUpperCase()}${emotion.slice(1)}`,
        }
      )
    })
  }

  async analyze(searchResult: ISearchResult[]): Promise<ITone[]> {
    const phrases = searchResult.map(item => item.text)
    const formattedPhrases = phrases.join('\n')

    const {
      result: { document_tone },
    } = await toneAnalyzer.tone({ toneInput: { text: formattedPhrases }, sentences: true })

    return this.setDefaultTones(document_tone.tones as ITone[])
  }
}

export { EmotionAnalyzerService }
