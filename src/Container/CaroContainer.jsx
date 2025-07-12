import React from 'react';

const CaroContainer = ({children}) => {
    return (
        <div className='max-w-[2520px] mx-auto'>
            {children}
        </div>
    );
};

export default CaroContainer;