import axios from "axios";
import { api } from "../../utility/api";

export function createGenre(token,obj){  
    return axios.post(`${api}/api/genres`,obj,
    {
        headers:{
        Authorization:"Bearer "+token
    }
})
}

export function getGenres(){
    return axios.get(`${api}/api/genres`);
}

export function getGenre(id){
    return axios.get(`${api}/api/genres/${id}`);
}

export function updateGenre(id,token,data){
    return axios.put(`${api}/api/genres/${id}`,data,
    {
        headers:{
            Authorization:"Bearer "+token
        }
    })
}