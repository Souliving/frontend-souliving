import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button";
  import { useNavigate } from "react-router-dom";
  import { useStore } from "@/AuthProvider";
  import {  Heart } from "lucide-react"
  import { userProperties } from "@/utils/constData";
import { AdShortForm } from "@/utils/dataStructure";
import { addFavoriteForm, getFavoriteForms } from "@/server/FormsApi";
import AdCard from "./AdCard";
import { useEffect, useState } from "react";
import { FormStoreType } from "@/store/FormStore";
import { observer } from "mobx-react";

interface AllAdsProps {
  adShortForms: AdShortForm[];
  usersPhotos: string[];
}

const AllAds: React.FC<AllAdsProps> = (({ adShortForms, usersPhotos }) => {
    
    const { user } = useStore();
    const [favoritesId, setFavoritesId] = useState<number[]>([]);
    useEffect(()=>{
      try{
        getFavoriteForms(user.user.id).then(data =>{
          setFavoritesId(data.map((form: { id: number; }) => form.id));
        })
    }
    catch{
        console.log('Error')
    }
    }, [])
   

    const addToFavorites = (favFormId: number) =>{
      const dataToServer = {userId: user.user.id, favFormId: favFormId}
      addFavoriteForm(dataToServer).then(data =>{
        console.log('to favorite', data)
      })
  
    }
  
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' , justifyContent: 'space-around', padding: '1%'}}>
        {adShortForms.map((adShortForm:AdShortForm, i:number) => (
           <AdCard
           key={adShortForm.id}
           adShortForm={adShortForm}
           userPhoto={usersPhotos[i]}
           toFavorites={addToFavorites}
           favoritesId={favoritesId}
         />
        ))}
      </div> 
          
      )
    })
    
    export default AllAds