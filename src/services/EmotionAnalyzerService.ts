import { toneAnalyzer } from '../config/ToneAnalyzer'

class EmotionAnalyzerService {
  async analyze(phrases: string[]): Promise<unknown> {
    const formattedPhrases = phrases.join('\n')

    const {
      result: { document_tone },
    } = await toneAnalyzer.tone({ toneInput: { text: formattedPhrases }, sentences: true })

    // console.log(result.result.document_tone)
    // console.log(result.result.sentences_tone)

    return document_tone
  }
}

export { EmotionAnalyzerService }
