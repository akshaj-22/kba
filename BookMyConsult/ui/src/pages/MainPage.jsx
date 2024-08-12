import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/MainPage.css'

const MainPage = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center min-h-screen p-4">

                <div className="text-center animate-fadeInUp max-w-lg mx-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-8 text-white drop-shadow-md">BookMyConsult</h1>
                    <p className="text-base md:text-lg mb-6 md:mb-8 text-white opacity-90">Connect with top healthcare professionals anytime, anywhere.</p>
                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                        <Link to="/login" className="bg-white text-blue-500 px-6 py-3 rounded-full shadow-lg font-bold hover:bg-blue-600 hover:text-white transition duration-300 inline-flex items-center justify-center space-x-2 transform hover:scale-105 animate-pulse w-full md:w-auto">
                            <span>Log In</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link to="/sign-up" className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-bold hover:bg-white hover:text-blue-600 transition duration-300 inline-flex items-center justify-center space-x-2 transform hover:scale-105 animate-pulse w-full md:w-auto">
                            <span>Sign Up</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainPage