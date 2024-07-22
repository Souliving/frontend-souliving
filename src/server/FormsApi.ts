import axios from 'axios';


const apiUrl = 'http://193.149.190.120:8080/';

export const getAllShortForms = async ()=>{
    const {data} = await axios.get(apiUrl+'api/v1/form/getShortForms')
    return data
}

export const getFormByUserId = async (userId: number) =>{
    const {data} = await axios.get(apiUrl + 'api/v1/form/getFormByUserId/' + userId)
    return data
}

export const getFormById = async (shortId: number) =>{
    const {data} = await axios.get(apiUrl + 'api/v1/form/getFormById/' + shortId)
    return data
}

export const getPhotoById = async (photoId: number) => {
    const response = await axios.get(apiUrl + 'api/v1/image/getImageById/' + photoId, {
        responseType: 'blob' 
    }); 
    const objectURL = URL.createObjectURL(response.data);
    return objectURL 
};

export const getFavoriteForms = async (userId: number) => {
    try {
        const { data } = await axios.get(apiUrl + 'api/v1/form/getFavoriteFormsByUserId/' + userId); // Убедитесь, что URL правильный
        return data;
    } catch (error) {
        console.error('Error adding favorite form');
        throw error;
    }
}
export const addFavoriteForm = async (dataBody: {userId: number, favFormId: number}) =>{
    const config = {
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
      };
    try {
        const { data } = await axios.put(apiUrl + 'api/v1/form/addFavoriteForm', dataBody, config); // Убедитесь, что URL правильный
        return data;
    } catch (error) {
        console.error('Error adding favorite form');
        throw error;
    }
}

export const deleteFavoriteForm = async (userId: number, favFormId: number) =>{
    const config = {
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        data: {
            userId: userId,
            favFormId: favFormId
          }
      };
    try {
        const { data } = await axios.delete(apiUrl + 'api/v1/form/deleteFavoriteForm', config); // Убедитесь, что URL правильный
        return data;
    } catch (error) {
        console.error('Error adding favorite form');
        throw error;
    }
}

export const filterAllAds = async (properties:any) =>{
    const config = {
        headers: {
          'Content-Type': 'application/json'
        },
      };
      try {
        const response = await axios.post(apiUrl+'api/v1/form/getShortFormsWithFilter', properties, config);
        return response.data;
      } catch (error) {
        // Обработка ошибки
        console.error('Ошибка запроса:', error);
        throw error; // Переброс ошибки, чтобы обработать ее в вызывающем коде
      }
}

