import axios from 'axios';

const apiUrl = 'http://193.149.190.120:8080/';

export const getAllShortForms = async ()=>{
    const {data} = await axios.get(apiUrl+'api/v1/shortForm/')
    return data
}

export const getFormByUserId = async (userId: number) =>{
    const {data} = await axios.get(apiUrl + 'api/v1/form/getFormByUserId/' + userId)
}

export const getFormByShortId = async (shortId: number) =>{
    const {data} = await axios.get(apiUrl + 'api/v1/form/getFormByShortFormId/' + shortId)
    return data
}