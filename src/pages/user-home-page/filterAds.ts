
import { City } from "@/utils/dataStructure";
import { z } from "zod"
 
export const filterAds=  z.object({ 
    preferences:  z.array(z.string(), z.undefined()),
    age: z.object({
      start: z.union([z.number(), z.undefined()]),
      end: z.union([z.number(), z.undefined()]),
    }),
    price: z.object({
      start: z.union([z.number(), z.undefined()]),
      end: z.union([z.number(), z.undefined()]),
    }),
    place: z.object({
        city: z.union([z.custom<City>(), z.undefined()]),
        subway:  z.array(z.number(), z.undefined()),
      })

})

export const ageAds = [
  {
    id: 1,
    label: '18-25',
  },
  {
    id: 2,
    label: '26-35',
  },
  {
    id: 3,
    label: '35-50',
  },
]
export const preferencesAds =[
  {
    id: "smoking",
    label: 'не курит',
  },
  {
    id: "alcohol",
    label: 'не пьет',
  },
  {
    id: "petFrendly",
    label: 'без животных',
  },
]
interface PreferencesOutput {
  price: {
    startPrice: number;
    endPrice: number;
  };
  age: {
    startAge: number;
    endAge: number;
  };
  cityId: number[];
  metroIds: number[];
  smoking: boolean;
  alcohol: boolean;
  petFriendly: boolean;
  isClean: boolean;
}

export const transformPreferences = (input: z.infer<typeof filterAds>): PreferencesOutput => {
  const { preferences, age, price, place } = input;
  
  // Устанавливаем значения по умолчанию, если preferences пустой
  const smoking = preferences.includes('smoking') ? preferences.includes('smoking') : null;
  const alcohol = preferences.includes('alcohol') ? preferences.includes('alcohol') : null;
  const petFriendly = preferences.includes('petFriendly') ? preferences.includes('petFriendly') : null;
  const isClean = preferences.includes('isClean') ? preferences.includes('isClean') : null;

  return {
    price: {
      startPrice: price.start || null,
      endPrice: price.end || null,
    },
    age: {
      startAge: age.start || null,
      endAge: age.end || null,
    },
    cityId: place.city.id != null ? [place.city.id]: [],
    metroIds: place.subway.map((subway) => subway || 0),
    smoking,
    alcohol,
    petFriendly,
    isClean,
  };
};

 