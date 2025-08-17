import React from 'react';
import { MdOutlinePayment } from "react-icons/md";
import { TbCashRegister } from "react-icons/tb";
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from '../../Share/MenuItem';

const ParticipentContainer = () => {
    return (
        <div>
            <MenuItem icon={BsGraphUp} label='Overview' address='analytic' />
            <MenuItem icon={TbCashRegister} label='Registered Camps' address='registercamp' />
            <MenuItem icon={MdOutlinePayment} label='Payment History' address='payment' /> 
        </div>
    );
};

export default ParticipentContainer;