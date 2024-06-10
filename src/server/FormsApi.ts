import axios from 'axios';
import { read } from 'fs';

const apiUrl = 'http://193.149.190.120:8080/';

export const getAllShortForms = async ()=>{
    const {data} = await axios.get(apiUrl+'api/v1/form/getShortForms')
    return data
}

export const getFormByUserId = async (userId: number) =>{
    const {data} = await axios.get(apiUrl + 'api/v1/form/getFormByUserId/' + userId)
}

export const getFormByShortId = async (shortId: number) =>{
    const {data} = await axios.get(apiUrl + 'api/v1/form/getFormByShortFormId/' + shortId)
    return data
}

export const getPhotoById = async (photoId: number) => {
    
    const response = await axios.get(apiUrl + 'api/v1/image/getImageById/' + photoId, {
        responseType: 'blob' 
    }); 
    const objectURL = URL.createObjectURL(response.data);
    return objectURL 
};

