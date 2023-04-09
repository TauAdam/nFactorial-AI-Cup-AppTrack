export enum ROUTES {
  HOME_PAGE = '/',
  GIFT_PAGE = '/gift',
  NOT_FOUND_PAGE = '*',
}

export interface IResponse {
  idea: string
  name: string
  prompt: string
  _id: number
}
export interface ICard {
  gift: string
  _id?: number
  name?: string
}

export enum ApiEndpoint {
  giftIdea = 'http://localhost:8080/api/v1/openai',
  createGift = 'http://localhost:8080/api/v1/gift',
}
