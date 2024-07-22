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
import { addFavoriteForm } from "@/server/FormsApi";
import AdCard from "./AdCard";
import { useEffect, useState } from "react";
import { FormStoreType } from "@/store/FormStore";
import { observer } from "mobx-react";

interface AllAdsProps {
  adShortForms: AdShortForm[];
  usersPhotos: string[];
  formStore?: FormStoreType;
}

const AllAds: React.FC<AllAdsProps> = observer(({ adShortForms, usersPhotos, formStore }) => {
    
    const { user } = useStore();
    const [favoritesId, setFavoritesId] = useState<number[]>([]);
    useEffect(()=>{
      if (formStore && formStore.favoriteForms.length === 0 && !formStore.loadingFavoriteForms) {
        formStore.loadFavoriteForms(user.user.id).then(() => {
          setFavoritesId(formStore.favoriteForms.map(form => form.id));
        });
      } else if (formStore) {
        setFavoritesId(formStore.favoriteForms.map(form => form.id));
      }
    }, [formStore, formStore?.favoriteForms.length, user.user.id])

    const addToFavorites = (favFormId: number) =>{
      const dataToServer = {userId: user.user.id, favFormId: favFormId}
      addFavoriteForm(dataToServer).then(data =>{
        console.log('to favorite', data)
      })
      console.log(formStore)
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