import { start } from "repl"
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
        city: z.union([z.string(), z.undefined()]),
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


 