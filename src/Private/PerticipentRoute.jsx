import React from 'react';
import useAuth from '../Hooks/useAuth'; 
import useRole from '../Hooks/useRole';
import LoadingEle from '../Components/Share/LoadingEle';
import { Navigate } from 'react-router';


const PerticipantRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <LoadingEle></LoadingEle>
    }

    if (!user || role !== 'participent') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate> 
    }

    return children;
};

export default PerticipantRoute; 