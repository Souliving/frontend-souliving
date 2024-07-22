import { filterAllAds, getAllShortForms, getPhotoById } from "@/server/FormsApi";
import { useEffect, useState } from "react";
import { AdShortForm, Subway } from "@/utils/dataStructure";

import { 
  Form, 
  FormControl, 
  FormField,
  FormItem, 
  FormLabel, 
   } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import AllAds from "./components/AllAds";
import { useForm } from "react-hook-form";
import { filterAds, preferencesAds, transformPreferences } from "./filterAds";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cities } from "@/utils/constData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { getAllSubwaysByCity } from "@/server/CitySubwayAPI";




const UserHomePage = ()=> {
  const [adShortForms, setAdShortForms] = useState<AdShortForm[]>([]);

  const [selectedStation, setSelectedStation] = useState<Subway[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const [usersPhotos, setUsersPhotos] = useState<string[]>([]);

  useEffect(() => {
    // Загрузка данных пользователя при монтировании компонента
    try {
      getAllShortForms().then((data: AdShortForm[]) => {
        setAdShortForms(data);
        console.log('adShortForms', data);
        const photoIds = data.map(form => form.photoId);
        getPhoto(photoIds);
        
      });
    } catch (error) {
      console.error('Произошла ошибка при загрузке данных пользователя:', error);
    }
  }, []);

  const getPhoto = async (photoIds: number[])=>{
    console.log('photoIds', photoIds)
    const photoData = await Promise.all(photoIds.map(id => getPhotoById(id)));
    setUsersPhotos(photoData)
    console.log('usersPhotos', photoData)
  } 

  
  const filterForm = useForm<z.infer<typeof filterAds>>({
    resolver: zodResolver(filterAds),
    defaultValues: {
      preferences:  [],
      age: {
        start: 18,
        end: 120
      },
      price: {
        start: undefined,
        end: undefined
      },
      place:{
        city: '',
        subway: [],
      }
    },
   
  })

  const onFilterAds = (data: z.infer<typeof filterAds>) =>{
    console.log('forms', data);
   const dataFoServer =  transformPreferences(data);
    filterAllAds(dataFoServer).then(res=>{
      setAdShortForms(res);
      const photoIds = res.map((form: { photoId: any; }) => form.photoId);
      getPhoto(photoIds);
    })
  }
  
  const filterSubwayByCity = (city:string) =>{
    console.log(city);
    
    getAllSubwaysByCity(city).then((data) =>{
      setIsOpen(true);
      setSelectedStation(data);
      console.log(selectedStation)
    })
  }

    return (
      <>  
      <Form {...filterForm} >
        <form onSubmit={filterForm.handleSubmit(onFilterAds)} 
            className="w-full flex items-baseline justify-between space-x-2">
                <FormField
                      rules={{}} 
                      control={filterForm.control}
                      name="preferences"
                      render={() => {
                        return (
                        <DropdownMenu >
                          <DropdownMenuTrigger asChild>
                            <Button className="w-1/4" variant="outline">Предпочтения</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-2/2">
                          {preferencesAds.map((item) => (
                            <FormField
                              key={item.id}
                              control={filterForm.control}
                              name="preferences"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                            )
                          }}
                        />
                          ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        )}}
                        />
                <FormField
                  rules={{}} 
                  control={filterForm.control}
                  name="age"
                  render={({field}) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-1/4" variant="outline">Возраст</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                      <Input
                          placeholder="От"
                          value={field.value.start ?? ''}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              start: e.target.value !== '' ? parseInt(e.target.value) : undefined
                            });
                          }}
                        />
                        <Input
                          placeholder="До"
                          value={field.value.end ?? ''}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              end: e.target.value !== '' ? parseInt(e.target.value) : undefined
                            });
                          }}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  />
                  <FormField
                  rules={{}} 
                  control={filterForm.control}
                  name="price"
                  render={({field}) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-1/4"  variant="outline">Цена</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                      <Input
                          placeholder="От"
                          value={field.value.start ?? ''}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              start: e.target.value !== '' ? parseInt(e.target.value) : undefined
                            });
                          }}
                        />
                        <Input
                          placeholder="До"
                          value={field.value.end ?? ''}
                          onChange={(e) => {
                            field.onChange({
                              ...field.value,
                              end: e.target.value !== '' ? parseInt(e.target.value) : undefined
                            });
                          }}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  />
                  <FormField
                    rules={{}} 
                    control={filterForm.control}
                    name="place.city"
                    render={({field}) => (
                      <>
                     
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-1/4"  variant="outline" >Местоположение</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-[200px] justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >

                                  {field.value
                                    ? cities.find(
                                        (city) => city.label === field.value
                                      )?.label
                                    : "Выберите город"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Поиск..." />
                                <CommandEmpty>Таких городов нет</CommandEmpty>
                                <CommandGroup>
                                <CommandList>
                                  {cities.map((city) => (
                                    <CommandItem
                                      value={city.id}
                                      key={city.id}
                                      onSelect={() => {
                                        filterForm.setValue("place.city", city.label)
                                        filterSubwayByCity(city.id)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          city.label == field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {city.label}
                                    </CommandItem>
                                  ))}
                                  </CommandList>
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                            
                           
                            {isOpen && (
                              <>
                                <div>Станции метро в {filterForm.getValues('place.city')}</div>
                                  {selectedStation && selectedStation.map((station:any) =>{
                                   return <FormField
                                        rules={{}} 
                                        key={station.id}
                                        control={filterForm.control}
                                        name="place.subway"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={station.id}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(station.id)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value, station.id])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) => value !== station.id
                                                          )
                                                        )
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal">
                                                {station.name}
                                              </FormLabel>
                                            </FormItem>
                                          )
                                        }}
                                    />
                                  })}
                              </>
                            )}  
                          </DialogContent>
                        </Dialog>
                      </>
                      
                       
                    )}
                  />

                  

          
        <Button type="submit">Найти</Button> 
        </form>
      </Form>
       <AllAds adShortForms={adShortForms} usersPhotos={usersPhotos} />
       
      </>
   
        
        
    )
  }
  
  export default UserHomePage
  