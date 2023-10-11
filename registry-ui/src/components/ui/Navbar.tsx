"use client"
import Link from "next/link";
import { useUser } from "../generated/nextjs";

export default function Navbar () {
    const { data: user } = useUser();

    return (

        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                <button
                    data-drawer-target="drawer-navigation"
                    data-drawer-toggle="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <svg
                        aria-hidden="true"
                        className="hidden w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Toggle sidebar</span>
                </button>
                <Link href="/dashboard" className="flex items-center">
                    <img src="/logo.webp" className="h-12 mr-3" alt="API Registry Logo" width={85} />
                </Link>
                <div className="flex items-center md:order-2">
                    {user
                        ? (
                            <>
                                <button 
                                    type="button" 
                                    className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                                    id="user-menu-button" 
                                    aria-expanded="false" 
                                    data-dropdown-toggle="user-dropdown"                                     
                                    data-dropdown-placement="bottom" >                                    
                                    <img className="w-10 h-10 rounded-full" src={user?.picture} alt="user photo" />
                                </button>
                                <div id="user-dropdown" className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</span>
                                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                                    </div>

                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )
                        : (
                            <div className="flex justify-end ml-5">
                                {/* <button
                                    type="button"
                                    className="bg-blue-600 rounded-lg text-white font-bold p-2"
                                    onClick={user ? () => logout({ logoutOpenidConnectProvider: true }) : () => login("auth0")}>
                                    Log In
                                </button> */}
                            </div>
                        )
                    }
                </div>
            </div>
        </nav>

    )
}
