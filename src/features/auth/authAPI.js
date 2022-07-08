import axios from "axios";
import { api } from "../../utility/api";

export function login(mobileNumber,password){
    return axios.post(`${api}/api/auth/admin/login`,{mobileNumber,password});
}

