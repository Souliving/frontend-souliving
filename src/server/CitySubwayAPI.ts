import axios from "axios";



const apiUrl = 'http://193.149.190.120:8080/api/v1';

export const getAllCities = async () => {
    const response = await axios.get(apiUrl+'/cities/ ')
    return response.data
}
export const getAllSubways = async () => {
    const response = await axios.get(apiUrl+'/metro/ ')
    return response.data
}