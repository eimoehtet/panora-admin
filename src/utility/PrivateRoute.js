import { useSelector } from "react-redux"
import { Navigate } from "react-router";

const PrivateRoute= (props)=>{
    const isAuthenticated=useSelector(state=>state.auth.isLoggedIn);

    if(isAuthenticated){
        return (
            props.children
        )
    }else{
        return <Navigate to='/login' replace/>
    }
}
export default PrivateRoute;