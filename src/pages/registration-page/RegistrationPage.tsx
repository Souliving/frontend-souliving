import { useStore } from "@/AuthProvider";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import {userRegistrationShema_1, userRegistrationShema_2} from "./UserRegistration"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registration } from "@/server/UserApi";

const RegistrationPage = () => {
    //const { user }= useStore();
    const [currentStep, setCurrentStep] = useState(1);
    const formStep1 = useForm<z.infer<typeof userRegistrationShema_1>>({
        resolver: zodResolver(userRegistrationShema_1),
        defaultValues: {
            email: "",
            password:"",
        },
       
    })
    const formStep2 = useForm<z.infer<typeof userRegistrationShema_2>>({
      resolver: zodResolver(userRegistrationShema_2),
      defaultValues: {
        username: '',
        surname:'',
        date:'',
        country:'',
        phone:''
      },
     
  })

    const onSubmitFirstStep= async(values: z.infer<typeof userRegistrationShema_1>)=>{

        console.log(currentStep, values)
        await registration(values.email, values.password)
        setCurrentStep(2);
    }
    function onSubmitSecondStep(values: z.infer<typeof userRegistrationShema_2>) {
            console.log(values);
          
      }
    
   
    return (
    <div className="flex items-center justify-center min-h-screen">
      {currentStep === 1 && (
        <Form {...formStep1}>
        <form onSubmit={formStep1.handleSubmit(onSubmitFirstStep)} 
              className="space-y-8">
       
          <FormField
            control={formStep1.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder="Почта" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={formStep1.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="Пароль" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        <Button type="submit">Продолжить</Button> 
        </form>
      </Form>
      )}
     {currentStep === 2 && ( <Form {...formStep2}>
        <form onSubmit={formStep2.handleSubmit(onSubmitSecondStep)} 
              className="space-y-8">
        
        
            <>
            <FormField
                control={formStep2.control}
                name="username"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                    <Input placeholder="Имя" {...field} />
                    </FormControl>
                </FormItem>
                )}
            />
            <FormField
                control={formStep2.control}
                name="surname"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Фамилия</FormLabel>
                    <FormControl>
                    <Input  placeholder="Фамилия" {...field} />
                    </FormControl>
                </FormItem>
                )}
            />
             <FormField
                control={formStep2.control}
                name="date"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Дата рождения</FormLabel>
                    <FormControl>
                    <Input type='datetime' placeholder="Дата рождения" {...field} />
                    </FormControl>
                </FormItem>
                )}
            />
             <FormField
                control={formStep2.control}
                name="country"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Страна</FormLabel>
                    <FormControl>
                    <Input  placeholder="Страна" {...field} />
                    </FormControl>
                </FormItem>
                )}
            />
          </>
          <Button type="submit">Зарегистрироваться</Button>
          
        </form>
      </Form> 
      )}
    </div>
    )
  }
  
  export default RegistrationPage