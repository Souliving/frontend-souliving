import { useStore } from "@/AuthProvider";
import { Toggle } from "@/components/ui/toggle";
import { getAllSubwaysByCity } from "@/server/CitySubwayAPI";
import { Subway } from "@/utils/dataStructure";
import { useState } from "react";

interface NewForm {
    userId: number,
    description: string,
    homeTypeId: number,
    rating: number,
    reviews: [],
    photoId: number,
    propertiesId: number,
    cityId: number,
    metroIds: number[],
    budget: number,
    dateMove: Date,
    onlineDateTime: Date
}

export default function CreateNewForm() {
    const {user} = useStore();
    const [selectedStation, setSelectedStation] = useState<Subway[]>([])
    const [newForm, setNewForm] = useState<NewForm>({
        userId: user.user.id,
        description: '',
        homeTypeId: 0,
        rating: 0,
        reviews: [],
        photoId: 0,
        propertiesId: 0,
        cityId: 0,
        metroIds: [],
        budget: 0,
        dateMove: new Date(),
        onlineDateTime: new Date(),
      })

    const chooseCity = (id:number) =>{
        setNewForm((prevForm: NewForm) => ({
            ...prevForm,
            cityId: prevForm.cityId === id ? 0 : id
          }));
        filterSubwayByCity(id)      
    }
    const chooseSubway = (id:number) =>{
        setNewForm(prevForm => {
            const updatedMetroIds = prevForm.metroIds.includes(id)
              ? prevForm.metroIds.filter(mId => mId !== id) 
              : [...prevForm.metroIds, id]; 
      
            return {
              ...prevForm,
              metroIds: updatedMetroIds
            };
          });        
    }
    const filterSubwayByCity = (cityId:number) =>{
        console.log(cityId);
        getAllSubwaysByCity(cityId).then((data) =>{
          setSelectedStation(data);
          console.log(selectedStation, newForm)
        })
    }

    const chooseHomeType = (id: number) =>{
        setNewForm((prevForm: NewForm) => ({
            ...prevForm,
            homeTypeId: prevForm.homeTypeId === id ? 0 : id
          }));
        
    }

    return (
        <>
        <div>
            <b>Выберите город</b>
            <div>
                <Toggle onClick={() => chooseCity(1)}>Москва</Toggle>
                <Toggle onClick={() => chooseCity(2)}>Санкт-Петербург</Toggle>
            </div>
        </div>
        <div>
            <b>Метро</b>
            <div>
                {selectedStation && selectedStation.map((station:Subway)=>(
                    <Toggle key={station.id} onClick={()=> chooseSubway(station.id)}>{station.name}</Toggle>
                 ))}
            </div>
            
        </div>
        
        <div>
            <b>Что Вам больше подходит?</b>
            <div>
                <Toggle onClick={()=> chooseHomeType(1)}>У меня уже есть квартира, ищу соседа</Toggle>
                <Toggle onClick={()=> chooseHomeType(2)}>Нет квартиры, хочу искать вместе с соседом</Toggle>
                <Toggle onClick={()=> chooseHomeType(3)}>Хочу квартиру с соседом</Toggle>
            </div>
            
        </div>
        <div>
            <b>Выберите вариант квартиры</b>
            <div>
                <Toggle>Студия</Toggle>
                <Toggle>1-комнатная</Toggle>
                <Toggle>2-комнатная</Toggle>
                <Toggle>3-комнатная</Toggle>
                <Toggle>4-комнатная и более</Toggle>
            </div>
        </div>
        <div></div>
    
        </>
       
        
    )
  }