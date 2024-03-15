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
    formId: number,
    userId: number,
    photoId: number,
    properties: Properties,
    city: City,
    district: District,
    metro: Subway,
    onlineDate: Date,
    budget: number,
    dateMove: Date
  }

  export interface Properties{
    id: number,
    smoking: number,
    alcohol: number,
    petFriendly: number,
    isClean: number,
    homeOwnerId: number
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
