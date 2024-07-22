
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";
import { useStore } from "@/AuthProvider";
import { postUserData } from "@/server/UserApi";
import { updateSecureLocalStorage, useSecureLocalStorage } from "@/utils/secureLocalStorage";
import { useEffect, useState } from "react";
import { getPhotoById } from "@/server/FormsApi";


const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }).optional(),
  email: z
    .string()
    .email().optional(),
 
})

type ProfileFormValues = z.infer<typeof profileFormSchema>


export function AccountForm() {
    const {user} = useStore();

    const defaultUserName = user.user.name || '';
    const defaultUserId = user.user.id || 5;
    let [userName, setUserName] = useState(user.user.name);
    const [userPhoto, setUserPhoto] = useState<string>('');
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: defaultUserName,
            email: user.user.email
        },
        mode: "onChange",
    })
    /* useEffect(()=>{
        try {
            getPhotoByUId().then((data: any) => {
            });
          } catch (error) {
            console.error('Произошла ошибка при загрузке данных пользователя:', error);
          }
    }) */
    useEffect(() => {
        console.log('User updated:', user.user);
        getPhoto(user.user.id)
    }, [user.user]);

    const getPhoto = async (photoIds: number)=>{
      console.log('photoIds', photoIds)
      const photoData = await getPhotoById(photoIds);
      setUserPhoto(photoData)
      console.log('usersPhotos', photoData)
    } 

    function onSubmit(data: ProfileFormValues) {
        console.log('update user',data, user.user);
        //user.setUser({ email: data.email, name: data.username});
       /*  user.setUser({ email: data.email, name: data.name, id: user.user.id}); */
        try{
            postUserData(data.name, user.user.id).then((res:any)=>{
                console.log(res);
                setUserName(data.name)
                /* user.setUser({ email: data.email, name: data.name, id: user.user.id}); */
                console.log('after update',user)
                updateSecureLocalStorage('userData', data);       
            })
        }
        catch{
            console.log('Ошибка обновления')
        } 
    }

  return (
    <>
    <div className="flex items-center">
        <Avatar className="w-1/4 h-1/4">
            <AvatarImage src={userPhoto} alt="User Photo" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl ml-4">{userName}</h2>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Введите имя" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Введите почту" {...field} />
              </FormControl>
              <FormMessage />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Обновить данные</Button>
      </form>
    </Form>
    </>
    
  )
}