import { IamAuthenticator } from 'ibm-watson/auth'
import LanguageTranslator from 'ibm-watson/language-translator/v3'

const { TRANSLATOR_API_KEY, TRANSLATOR_SERVICE_URL } = process.env

const languageTranslator = new LanguageTranslator({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: TRANSLATOR_API_KEY as string,
  }),
  serviceUrl: TRANSLATOR_SERVICE_URL,
})

export { languageTranslator }
