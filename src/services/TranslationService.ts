import { languageTranslator } from '../config/Translator'
import ISearchResult from '../models/ISearchResult'
import { addIdentificationToPhrase, removeIdentificationFromPhrase, findPhraseWithId, fixPhraseId } from '../utils/phraseIdentification'
import removeNewline from '../utils/removeNewline'

enum Language {
  English = 'en',
  Portuguese = 'pt',
}

class TranslationService {
  async translate(search: ISearchResult[]): Promise<ISearchResult[]> {
    const phrasesWithIds = search.map(item => removeNewline(addIdentificationToPhrase(item.id, item.text)))

    const {
      result: { translations },
    } = await languageTranslator.translate({ source: Language.Portuguese, target: Language.English, text: phrasesWithIds })

    const translatedPhrasesWithIds = translations.map(({ translation }) => fixPhraseId(translation))

    return search.map(item => {
      const phraseWithId = findPhraseWithId(item.id, translatedPhrasesWithIds)

      const phrase = removeIdentificationFromPhrase(item.id, phraseWithId as string)

      return { ...item, text: phrase }
    })
  }
}

export { TranslationService }
