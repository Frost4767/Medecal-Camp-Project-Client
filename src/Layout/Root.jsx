import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Share/Navbar';
import Footer from '../Components/Share/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-180px)]'>
                <Outlet></Outlet>
            </div>
            <ToastContainer />
            <Footer></Footer>
        </>
    );
};

export default Root;