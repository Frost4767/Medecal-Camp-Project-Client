import React from 'react';
import { Link, useRouteError } from 'react-router';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='py-24 text-center bg-white'>
                <title>Error page</title>
                <div className='lg:size-2/4 mx-auto'>
                    <DotLottieReact
                    src="https://lottie.host/5ed5666c-77ad-4976-80fc-592f172c1143/G0nOtcts02.lottie"
                    loop
                    autoplay
                    />
                </div>
                

                <h1 className='mb-8 text-7xl font-thin text-gray-900'>
                    {error?.status || 404}
                </h1>
                <p className='mb-3 md:mb-8 text-xl font-bold text-gray-900 md:text-2xl'>
                    {error?.error?.message || 'Something Went Wrong!'}
                </p>
                <Link className="btn bg-green-600 px-4 py-2 rounded-full text-white text-xl font-bold" to='/'>
                    Go to Homepage
                </Link>
            </div>
    );
};

export default ErrorPage;