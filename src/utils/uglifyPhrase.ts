import ISearchResult from '../models/ISearchResult'

const UGLIFYER_CHARACTER = process.env.UGLIFYER_CHARACTER || ''

const uglifyPhrase = (id: string, phrase: string): string => {
  return `${id}${UGLIFYER_CHARACTER}${phrase}`
}

const deUglifyPhrase = (id: string, phrase: string): string => {
  const idString = String(id)

  return phrase.replace(idString, '').replace(UGLIFYER_CHARACTER, '')
}

const uglifySentences = (sentences: ISearchResult[]): ISearchResult[] => {
  return sentences.map(item => {
    const uglifiedSentence = uglifyPhrase(item.id, item.text)

    return { ...item, text: uglifiedSentence }
  })
}

const deUglifySentences = (phrases: string[], sentences: ISearchResult[]): ISearchResult[] => {
  return sentences.map(item => {
    const decoder = `${item.id} ${UGLIFYER_CHARACTER} `
    const encodedSentence = phrases.find(phrase => phrase.includes(decoder) || phrase.includes(`${item.id}${UGLIFYER_CHARACTER}`)) || ''
    const decodedSentence = encodedSentence?.replace(decoder, '').replace(`${item.id}${UGLIFYER_CHARACTER}`, '')

    return { ...item, text: decodedSentence }
  })
}

export { uglifyPhrase, deUglifyPhrase, uglifySentences, deUglifySentences }
