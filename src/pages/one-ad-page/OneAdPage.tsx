import { useStore } from "@/AuthProvider"
import AppBar from "@/components/header/AppBar"
import { getFormByShortId, getFormByUserId } from "@/server/FormsApi"
import { AdForm } from "@/utils/dataStructure"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"


const OneAdPage=(() => {
  const {user} = useStore()
  console.log('OneAdPage', user._isAuth);

  const { id } = useParams();
  const shortFormId = parseInt(id, 10);

  const [ad, setAd] =useState<AdForm>()
  const location = useLocation();
  const shortAd = location.state?.shortAd;
  console.log('One ad page ', shortAd);

  
  useEffect(() => {
    try {
      getFormByShortId(shortFormId).then((data: AdForm) => {
        setAd(data);

        console.log('full form', ad);
      });
    } catch (error) {
      console.error('Произошла ошибка при загрузке данных пользователя:', error);
    }
  }, [shortFormId]);

  /* useEffect(() => {
    console.log(ad)
  }, [ad]); */
  
      return (
        <>
          <AppBar/>
          <div>{ad?.description}</div>

        </>
     
        
          
      )
    })
    
export default OneAdPage
    