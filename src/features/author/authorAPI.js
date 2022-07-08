import axios from "axios";
import { api } from "../../utility/api";

// A mock function to mimic making an async request for data
export function createAuthor(token,payload) {
  const formData=new FormData();
  const blob=new Blob([JSON.stringify(payload.data)],{type:"application/json"});
  formData.append("data",blob);
  formData.append("image",payload.image);
  return axios.post(`${api}/api/authors`,formData,
  {
    headers:{
      Authorization:"Bearer "+token
    }
  });
}

export function getAuthors(){
  return axios.get(`${api}/api/authors`)
}

export function getAuthor(id){
  return axios.get(`${api}/api/authors/${id}`)
}

export function updateAuthor(id,token,data){
  return axios.put(`${api}/api/authors/${id}`,data,
  {
    headers:{
      Authorization:"Bearer "+token
    }
    })
}