import React from 'react';
import { FaUserCog } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from '../../Share/MenuItem';

const ParticipentContainer = () => {
    return (
        <div>
            <MenuItem icon={BsGraphUp} label='Analytics' address='analytic' />
            <MenuItem icon={FaUserCog} label='Registered Camps' address='registercamp' />
            <MenuItem icon={FaUserCog} label='Payment History' address='payment' /> 
        </div>
    );
};

export default ParticipentContainer;