import React from "react";
import { Link, useRouteError } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="py-24 text-center bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen flex flex-col items-center justify-center">
      <title>Error page</title>

      {/* Lottie Animation */}
      <div className="lg:w-2/4 w-3/4 mx-auto mb-8">
        <DotLottieReact
          src="https://lottie.host/5ed5666c-77ad-4976-80fc-592f172c1143/G0nOtcts02.lottie"
          loop
          autoplay
        />
      </div>

      {/* Error Code */}
      <h1 className="mb-8 text-7xl font-thin text-gray-900 dark:text-gray-100">
        {error?.status || 404}
      </h1>

      {/* Error Message */}
      <p className="mb-8 text-xl font-bold text-gray-900 dark:text-gray-200 md:text-2xl">
        {error?.error?.message || "Something Went Wrong!"}
      </p>

      {/* Homepage Button */}
      <Link
        className="bg-[#00a63e] hover:bg-green-700 text-white px-6 py-3 rounded-full text-xl font-bold transition-colors duration-200"
        to="/"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
