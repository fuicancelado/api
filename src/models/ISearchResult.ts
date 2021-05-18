export default interface ISearchResult {
  id: string
  original_text: string
  text: string
  type: 'tweet'
  language: string
  user: {
    name: string
    profile_image: string
    nickname: string
  }
  tweet: {
    id: number
    id_str: string
    url: string
    created_at: Date
  }
}
