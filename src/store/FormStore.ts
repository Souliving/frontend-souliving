import { getFavoriteForms } from "@/server/FormsApi";
import { AdShortForm } from "@/utils/dataStructure";
import { makeAutoObservable } from "mobx";

export interface FormStoreType {
    favoriteForms: AdShortForm[]; // Замените `any` на точный тип данных формы
    loadingFavoriteForms: boolean | undefined;
    loadFavoriteForms: (userId: number) => Promise<void>;
    toggleFavorite: (form: AdShortForm) => void; // Замените `any` на точный тип данных формы
}

class FormStore {
    favoriteForms = [];
    loadingFavoriteForms: boolean | undefined;
  
    constructor() {
      makeAutoObservable(this);
    }

    async loadFavoriteForms(userId: number) {
        if (this.favoriteForms.length > 0) return;
        this.loadingFavoriteForms = true;
        try{
            getFavoriteForms(userId).then(data =>{
                this.favoriteForms = data;
                console.log('favoriteForms',data)
                //const photoIds = data.map(form => form.photoId);
                //getPhoto(photoIds);
            })
        }
        catch{
            console.log('Error')
        }
        finally {
          this.loadingFavoriteForms = false;
        }
      }

    toggleFavorite(form: AdShortForm) {
      if (this.favoriteForms.includes(form)) {
        this.favoriteForms = this.favoriteForms.filter(fav => fav !== form);
      } else {
        this.favoriteForms.push(form);
      }
    }
  }
  
const formStore = new FormStore();
export default formStore;