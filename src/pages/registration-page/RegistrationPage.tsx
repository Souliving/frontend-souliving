import { useStore } from "@/AuthProvider";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { format } from "date-fns"
import {userRegistrationShema_1, userRegistrationShema_2} from "./UserRegistration"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registration } from "@/server/UserApi";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { strict } from "assert";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSecureLocalStorage } from "@/utils/secureLocalStorage";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const { user }= useStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    
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
        birthDate: new Date(),
        gender:'',
        phone:''
      },
     
  })

    const onSubmitFirstStep= async(values: z.infer<typeof userRegistrationShema_1>)=>{

        console.log(currentStep, values)
        setEmail(values.email);
        setPassword(values.password);
        console.log('step1', email, password)
        setCurrentStep(2);
        
        
       
    }
    const onSubmitSecondStep = async(values: z.infer<typeof userRegistrationShema_2>) => {
            console.log(values, values.birthDate);
            try {
              await registration(email, 
                password,
                values.username,
                values.birthDate.toISOString().split('T')[0],
                values.gender,
                values.phone).then((data)=>{
                  console.log('res data',data)
                  user.setIsAuth(true);
                  user.setUser({ id: data.id, email: data.email, name: data.name});
                 /*  
                   */
                  useSecureLocalStorage('userData', data);
                  if(data){
                    navigate('/', { replace: true })
                  }
                })
             } catch (error) {
               // Обработка ошибки, если запрос завершается с ошибкой
               console.error('Произошла ошибка при отправке данных:', error);
             }
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


     {currentStep === 2 && (<Form {...formStep2}>
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
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                   {/*  <FormLabel>Date of birth</FormLabel> */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          fromYear={1960}
                        />
                        {/* <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: Date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        /> */}
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
             />
             <FormField
                control={formStep2.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пол</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберете пол" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Мужчина</SelectItem>
                        <SelectItem value="FEMALE">Женщина</SelectItem>
        
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formStep2.control}
                name="phone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                    <Input placeholder="Телефон" {...field} />
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