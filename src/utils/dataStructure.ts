export interface User {
    id: number,
    email: string,
    name: string,

}

export interface AdForm{
  id: number,
  userId: number,
  shortFormId: number,
  description: string,
  homeType: HomeType,
  socialMediaIds: [],
  rating: number,
  reviews: []
}

export interface AdShortForm {
    id: number,
    name: string,
    age: number,
    formId: number,
    userId: number,
    photoId: number,
    properties: Properties,
    city: City,
    district: District,
    metro: Subway,
    onlineDateTime: Date,
    budget: number,
    description: string,
    dateMove: Date,
  }

  export interface Properties{
    id: number,
    smoking: boolean,
    alcohol: boolean,
    petFriendly: boolean,
    isClean: boolean,
    homeOwnerId: boolean
  }

  export interface Subway{
    id: number,
    name: string,
    cityId: number
  }

  export interface City{
    id: number,
    name: string
  }

  export interface District{
    id: number,
    name: string,
    cityId: number
  }

  export interface HomeType{
    id: number,
    name: string
  }
