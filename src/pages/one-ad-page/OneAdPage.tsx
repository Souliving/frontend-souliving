import { useStore } from "@/AuthProvider"
import AppBar from "@/components/header/AppBar"
import { getFormById, getFormByUserId } from "@/server/FormsApi"
import { AdForm } from "@/utils/dataStructure"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import "./OneAdPage.css"

const OneAdPage=(() => {
  const {user} = useStore()
  console.log('OneAdPage', user._isAuth);

  const { id } = useParams();
  const shortFormId = parseInt(id, 10);

  const [ad, setAd] =useState<AdForm>()
  const location = useLocation();
  const { shortAd, userPhoto } = location.state;
  console.log('One ad page ', shortAd, userPhoto, location.state);

  
  useEffect(() => {
    try {
      getFormById(shortFormId).then((data: AdForm) => {
        /* delete data.description;
        delete data.id */
        const fullForm = {...shortAd, ...data};
        setAd(fullForm);
        /* if(!shortAd){
          getFormBy
        } */
        console.log('full form', fullForm);
      });
    } catch (error) {
      console.error('Произошла ошибка при загрузке данных пользователя:', error);
    }
   
  }, []);



 
  
      return (
        <>
          <AppBar/>
          <div className="container one-ad">
            <div className = "one-ad__images">
            <img className='main-img' 
                    src={userPhoto} 
                    alt="User Photo" 
                />
            </div>
            <div className = 'one-ad__info'>
            {ad && (
          <>
            <div className="title-name">{ad.name}</div>
            <div>{ad.age} года, г. {ad.city.name}</div>
            <div>Метро: 
              {ad.metro.map(subway => (
                <span key={subway.id}>{subway.name}</span>
              ))}
            </div>
            {ad.properties.homeOwnerId && (
              <div>Квартира: {ad.homeType?.name}</div>
            )}
            <div>О себе: {ad.description}</div>
            
          </>
        )}
              
              
            </div>
          </div>

        </>
     
        
          
      )
    })
    
export default OneAdPage
    