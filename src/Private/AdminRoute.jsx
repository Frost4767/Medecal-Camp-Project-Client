import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../Hooks/useRole';
import LoadingEle from '../Components/Share/LoadingEle';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <LoadingEle></LoadingEle>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;