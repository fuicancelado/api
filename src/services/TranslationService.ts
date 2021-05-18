import { languageTranslator } from '../config/Translator'
import ISearchResult from '../models/ISearchResult'
import { uglifySentences, deUglifySentences } from '../utils/uglifyPhrase'

enum Language {
  English = 'en',
}

class TranslationService {
  async translate(search: ISearchResult[]): Promise<ISearchResult[]> {
    const uglifiedSentences = uglifySentences(search, 'text')
    const mappedText = uglifiedSentences.map(item => item.text)

    const language = 'pt'

    const {
      result: { translations },
    } = await languageTranslator.translate({ source: language, target: Language.English, text: mappedText })

    const mappedTranslations = translations.map(translation => translation.translation)

    const deUglifiedSentences = deUglifySentences(mappedTranslations, uglifiedSentences)

    return deUglifiedSentences
  }
}

export { TranslationService }
