import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../hooks/useAdmin';
import Loading from '../../Shared/Loading/Loading';

const RequireAdmin = ({children}) => {
    const location = useLocation() 
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user)

    useEffect(() => {
        localStorage.setItem("firebaseAuthInfo", JSON.stringify(user));
    }, [user])

    const loggedInData = JSON.parse(localStorage.getItem("firebaseAuthInfo"));

    if(!user || !admin && !loggedInData ){
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if(loading || adminLoading){
        return <Loading></Loading>
    }
    
    return children;
};

export default RequireAdmin;