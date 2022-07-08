import axios from "axios";
import { api } from "../../utility/api";

export function createBook(token,payload){
    const formData=new FormData();
    const blob=new Blob([JSON.stringify(payload.data)],{type:"application/json"});
    formData.append("data",blob);
    formData.append("image",payload.image);
    return axios.post(`${api}/api/books`,formData,
    {
        headers:{

            Authorization:"Bearer "+token
        }
    });
}

export function getBooks(){
    return axios.get(`${api}/api/books`);
}

export function getBook(id){
    return axios.get(`${api}/api/books/${id}`);
}

export function updateBook(id,token,data){
    return axios.put(`${api}/api/books/${id}`,data,
   { 
    headers:{
        Authorization:"Bearer "+token
    }
    
});

}