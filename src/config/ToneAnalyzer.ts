import { IamAuthenticator } from 'ibm-watson/auth'
import ToneAnalyzer from 'ibm-watson/tone-analyzer/v3'

const { ANALYZER_API_KEY, ANALYZER_SERVICE_URL } = process.env

const toneAnalyzer = new ToneAnalyzer({
  version: '2020-08-27',
  authenticator: new IamAuthenticator({
    apikey: ANALYZER_API_KEY as string,
  }),
  serviceUrl: ANALYZER_SERVICE_URL,
})

export { toneAnalyzer }
