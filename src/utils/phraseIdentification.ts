const addIdentificationToPhrase = (id: string, phrase: string): string => `{{${id}}} ${phrase}`

const removeIdentificationFromPhrase = (id: string, phrase: string): string => phrase.replace(`{{${id}}}  `, '')

const findPhraseWithId = (id: string, phrases: string[]): string | undefined => phrases.find(phrase => phrase.includes(id))

const fixPhraseId = (phrase: string): string => {
  const phraseId = phrase.substring(phrase.indexOf('{{'), phrase.indexOf('}}') + 2)

  const phraseWithoutId = phrase.replace(phraseId, '')
  const correctedPhraseId = phraseId.replace(' ', '')

  return `${correctedPhraseId} ${phraseWithoutId}`
}

export { addIdentificationToPhrase, removeIdentificationFromPhrase, findPhraseWithId, fixPhraseId }
