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
  import { UsersPhotos } from "@/utils/devStructure";
  import { userProperties } from "@/utils/constData";
import { AdShortForm } from "@/utils/dataStructure";

const AllAds=(({ adShortForms, usersPhotos}) => {
    
    const navigate = useNavigate();
    const { user } = useStore();
    
  
    const navigateToFullForm = (( shortAd: AdShortForm, e: { preventDefault: () => void })=>{
      e.preventDefault();
      if(user._isAuth){
        console.log('kkkkkkkkkkkk')
      } 
      const cardId = shortAd.id;
      console.log('переход к форме с id', cardId)
     
      navigate(`/ad/${cardId}`, { state: { shortAd } });
    })
  
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' , justifyContent: 'space-around', padding: '1%'}}>
        {adShortForms.map((adShortForm:AdShortForm, i:number) => (
          <Card 
            style={{ margin: '10px',  width:'25%', height: 'fit-content' }} 
            key={adShortForm.id}
          >
            {i}
            <CardHeader>
              <CardDescription>
               <img className='' 
                    src={usersPhotos[i]} 
                    alt="User Photo" 
                />
                <div style={{ display: 'flex', padding: '1%'}}>
                  {Object.keys(adShortForm.properties).map((key:string) => (
                              adShortForm.properties[key] && 
                              <div key={key} 
                                  >
                                {userProperties[key]}
                              </div>
                    ))}
                </div>
                
         
              </CardDescription>
            </CardHeader>
            <CardContent> 
            
              {adShortForm.name}, {adShortForm.age} года
              <p className='text-xs'>{adShortForm.city.name}, м. {adShortForm.metro.name}</p>
              <div className="ml-auto mr-0">{adShortForm.budget}</div>
              <p>{adShortForm.description}</p>
            </CardContent>
            <CardFooter>    
              <Button
                style={{ width:'90%'}}
                onClick={(event) => navigateToFullForm(adShortForm, event)}
              >Узнать больше</Button>
            </CardFooter>
          </Card>
        ))}
      </div> 
          
      )
    })
    
    export default AllAds