import ITone from '../models/ITone'

interface ICancelometer {
  balance: number
}

class CancelometerService {
  calculate(tones: ITone[]): ICancelometer {
    const negativeEmotions = ['fear', 'anger', 'sadness', 'tentative']
    const positiveEmotions = ['confident', 'joy', 'analytical']

    const negativeTones = tones.filter(tone => negativeEmotions.includes(tone.tone_id))
    const positiveTones = tones.filter(tone => positiveEmotions.includes(tone.tone_id))

    const negativeTonesAverage =
      negativeTones.reduce((currentAverage, tone) => {
        return currentAverage + tone.score
      }, 0) / negativeEmotions.length

    const positiveTonesAverage =
      positiveTones.reduce((currentAverage, tone) => {
        return currentAverage + tone.score
      }, 0) / positiveTones.length

    return {
      balance: (negativeTonesAverage * 100 || 1) / (positiveTonesAverage * 100 || 1),
    }
  }
}

export { CancelometerService }
