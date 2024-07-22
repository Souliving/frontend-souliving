import { useStore } from "@/AuthProvider"
import { deleteFavoriteForm, getFavoriteForms, getPhotoById } from "@/server/FormsApi"
import { AdShortForm } from "@/utils/dataStructure";
import { useEffect, useState } from "react"
import AdCard from "../user-home-page/components/AdCard";
import AppBar from "@/components/header/AppBar";
import { observer } from "mobx-react";
import { FormStoreType } from "@/store/FormStore";
interface FavoritesPageProps {
    formStore: FormStoreType; // Тип для prop formStore
  }
const FavoritesPage = observer(( {formStore}: FavoritesPageProps ) => {
    const {user} = useStore();
    const [adFavForms, setAdFavForms] = useState<AdShortForm[]>([]);
    const [usersPhotos, setUsersPhotos] = useState<T[]>([]);
    const [favoritesId, setFavoritesId] = useState<number[]>([]);
    useEffect(() => {
        if (formStore.favoriteForms.length === 0 && !formStore.loadingFavoriteForms) {
          formStore.loadFavoriteForms(user.user.id);
        }
        else{
            const photoIds = formStore.favoriteForms.map(form => form.photoId);
            setFavoritesId(formStore.favoriteForms.map(form => form.id));
            getPhoto(photoIds);
        }
    }, [formStore, formStore.favoriteForms.length, user.user.id]);
    
    /* useEffect(()=>{
        try{
            getFavoriteForms(user.user.id).then(data =>{
                setAdFavForms(data);
                console.log(data)
                const photoIds = data.map(form => form.photoId);
                getPhoto(photoIds);
            })
        }
        catch{
            console.log('Error')
        }
    }, []) */
    const getPhoto = async (photoIds: number[])=>{
        console.log('photoIds', photoIds)
        const photoData = await Promise.all(photoIds.map(id => getPhotoById(id)));
        setUsersPhotos(photoData)
        console.log('usersPhotos', photoData)
      } 
    const deleteFavForm = (formId: number)=>{
        try{
            deleteFavoriteForm(user.user.id, formId).then(() =>{
              
                const filterAds = adFavForms.filter(item => item.id !== formId);
                const photoIds = filterAds.map(form => form.photoId);
                setAdFavForms(filterAds)
                getPhoto(photoIds);
                
            })
        }
        catch{
            console.log('error delete favorite ad')
        }
    }
    return (
        <>
        <AppBar/>
        <div className="space-y-6">
            <div style={{ display: 'flex', flexWrap: 'wrap' , justifyContent: 'space-around', padding: '1%'}}>
                {formStore.favoriteForms.map((adFavForm:AdShortForm, i:number) => (
                <AdCard
                key={adFavForm.id}
                adShortForm={adFavForm}
                userPhoto={usersPhotos[i]}
                toFavorites={deleteFavForm}
                favoritesId={favoritesId}
            
                />
                ))}
            </div> 
        </div>
        </>
      
    )
  })
export default FavoritesPage