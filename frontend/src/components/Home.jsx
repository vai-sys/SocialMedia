import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Our App</h1>
      <div className="space-y-4">
        <Link to='/user-submission-form'>
          <button className="w-48 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out">
            User Login
          </button>
        </Link>
        <Link to='/admin'>
          <button className="w-48 bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition duration-300 ease-in-out">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;