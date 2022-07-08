import axios from "axios";
import { api } from "../../utility/api";

export function getOrders(token){
    return axios.get(`${api}/api/orders/user`,
    {
        headers : {
            Authorization : "Bearer "+token
        }
    })
}
export function getOrderDetails(id,token){
    return axios.get(`${api}/api/orders/${id}`,
    {
        headers:{
            Authorization:"Bearer "+ token
        }
    })
}