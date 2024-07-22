import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button";  
import {  Heart } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { AdShortForm, Subway } from "@/utils/dataStructure";
import { useStore } from "@/AuthProvider";
import { userProperties } from "@/utils/constData";

interface AdCardProps {
  adShortForm: AdShortForm;
  userPhoto: string;
  toFavorites: (id: number) => void;
  favoritesId?: number[];
}

const AdCard : React.FC<AdCardProps> = ({ adShortForm, userPhoto, toFavorites, favoritesId }) => {
    const navigate = useNavigate();
    const { user } = useStore();
    const navigateToFullForm = (( shortAd: AdShortForm, userPhoto)=>{
      
        if(user._isAuth){
          console.log('kkkkkkkkkkkk')
        } 
        const cardId = shortAd.id;
        console.log('переход к форме с id', cardId, userPhoto)
       
        navigate(`/ad/${cardId}`, { state: { shortAd, userPhoto} });
    })
    const isFavorite = (()=>{
      console.log(favoritesId, adShortForm.id)
      if (favoritesId ) return favoritesId.includes(adShortForm.id);
    }) 

  return (
    <Card style={{ margin: '10px', width: '25%', height: 'fit-content' }} key={adShortForm.id}>
      <CardHeader>
        <CardDescription>
          <img src={userPhoto} alt="User Photo" />
          <div style={{ display: 'flex', padding: '1%' }}>
            {Object.keys(adShortForm.properties).map((key:string) => (
              adShortForm.properties[key] && <div key={key}>{userProperties[key]}</div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {adShortForm.name}, {adShortForm.age} года
        <p className="text-xs">{adShortForm.city.name}, {adShortForm.metro.map((metroStation: Subway) => (
            <div key={metroStation.id} className="text-xs">
              м. {metroStation.name}
            </div>
          ))}</p>
        <p className="ml-auto mr-0">{adShortForm.budget}</p>
        <p>{adShortForm.description}</p>
        <Button className="mr-[0.2%]" variant="ghost" onClick={() => toFavorites(adShortForm.id)}>
        <Heart color={isFavorite() ? 'red' : 'black'} />
        </Button>
      </CardContent>
      <CardFooter>
        <Button style={{ width: '90%' }} onClick={() => navigateToFullForm(adShortForm, userPhoto)}>
          Узнать больше
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdCard;
