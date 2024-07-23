import axios from "axios";



const apiUrl = 'http://193.149.190.120:8080/api/v1';

export const getAllCities = async () => {
    const {data} = await axios.get(apiUrl+'/cities/ ')
    return data
}
export const getAllSubways = async () => {
    const response = await axios.get(apiUrl+'/metro/ ')
    return response.data
}

export const getAllSubwaysByCity = async (city_id) => {
    const response = await axios.get(apiUrl+'/metro/getAllMetroByCityId/'+city_id)
    return response.data
}
