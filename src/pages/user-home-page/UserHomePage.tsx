import { getAllShortForms } from "@/server/FormsApi";
import { useEffect, useState } from "react";
import { AdShortForm } from "@/utils/dataStructure";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { useStore } from "@/AuthProvider";

const UserHomePage=(() => {
  const [adShortForms, setAdShortForms] = useState<AdShortForm[]>([]);
  const navigate = useNavigate();
  const { user } = useStore();
  useEffect(() => {
    // Загрузка данных пользователя при монтировании компонента
    try {
      getAllShortForms().then((data: AdShortForm[]) => {
        setAdShortForms(data);
        console.log('adShortForms', data);
      });
    } catch (error) {
      console.error('Произошла ошибка при загрузке данных пользователя:', error);
    }
  }, []);

  const navigateToFullForm = ((cardId:number, e: { preventDefault: () => void })=>{
    e.preventDefault();
    if(user._isAuth){
      console.log('kkkkkkkkkkkk')
    }
    console.log('переход к форме с id', cardId)

    navigate('/ad/:'+cardId);
  })

    return (
      <div 
      style={{ display: 'flex', flexWrap: 'wrap' , padding: '1%'}}>
      {adShortForms.map((adShortForm:AdShortForm) => (
        <Card 
        style={{ margin: '10px', flex: '1 0 300px' }} 
        key={adShortForm.id}
        >
          <CardHeader>
            <CardTitle>{`${adShortForm.id}`}</CardTitle>
            <CardDescription>
              {`Ищу квартиру в городе ${adShortForm.city.name}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{`Метро ${adShortForm.metro.name}`}</p>
            <p>{`Район ${adShortForm.district.name}`}</p> 
            <p>{`Запланированный бюджет ${adShortForm.budget}`}</p>
          </CardContent>
          <CardFooter>    
            <Button
              style={{ width:'90%'}}
              onClick={(event) => navigateToFullForm(adShortForm.id, event)}
            >Узнать больше</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
        
        
    )
  })
  
  export default UserHomePage
  