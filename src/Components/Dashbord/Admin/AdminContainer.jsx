import React from 'react';
import { FaUserCog } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from '../../Share/MenuItem';
import { MdAddChart } from "react-icons/md";

const AdminContainer = () => {
    return (
        <div>
            <MenuItem icon={BsGraphUp } label='Overview' address='adminanalytic' />
            <MenuItem icon={MdAddChart } label='Add camp' address='addcamp' />
            <MenuItem icon={FaUserCog} label='Manage Camp' address='managecamp' />
            <MenuItem icon={FaUserCog} label='Manage Registered' address='manageresiter' />
        </div>
    );
};

export default AdminContainer;