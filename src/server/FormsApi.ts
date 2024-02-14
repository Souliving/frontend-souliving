import axios from 'axios';

const apiUrl = 'http://193.149.190.120:8080/';

export const getAllShortForms = async ()=>{
    const {data} = await axios.get(apiUrl+'api/v1/shortForm/')
    return data
}