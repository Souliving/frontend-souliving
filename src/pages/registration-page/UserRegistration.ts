
import { z } from "zod"
 
export const userRegistrationShema_1 =  z.object({ 
    email: z.string(),
    password:z.string().min(8,{
        message: "Минимальная длина пароля - 8 символов",
    })
})

export const userRegistrationShema_2 = z.object({ 
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    surname:z.string(),
    
    date:z.string().datetime({ offset: true }),
    country:z.string(),
    phone:z.string()

})
 
