import React from 'react';
import { FaUserCog } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from '../../Share/MenuItem';

const AdminContainer = () => {
    return (
        <div>
            <MenuItem icon={BsGraphUp} label='Add camp' address='addcamp' />
            <MenuItem icon={FaUserCog} label='Manage Camp' address='managecamp' />
            <MenuItem icon={FaUserCog} label='Manage Registered' address='manageresiter' />
        </div>
    );
};

export default AdminContainer;