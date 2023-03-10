import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequireAuth = ({children}) => {
    const location = useLocation() 
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        localStorage.setItem("firebaseAuthInfo", JSON.stringify(user));
    }, [user])

    const loggedInData = JSON.parse(localStorage.getItem("firebaseAuthInfo"));

    if(!user && !loggedInData ){
        
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if(loading){
        return <Loading></Loading>
    }
    
    return children;
};

export default RequireAuth;