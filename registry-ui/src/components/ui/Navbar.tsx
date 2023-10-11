"use client"
import Link from "next/link";
import { useUser } from "../generated/nextjs";

export default function Navbar () {
    const { data: user } = useUser();

    return (

        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
            <div className="flex flex-wrap justify-between items-center">
                <Link href="/dashboard" className="flex items-center">
                    <img src="/logo.webp" className="h-12 mr-3" alt="API Registry Logo" width={85} />
                </Link>
                <div className="flex items-center md:order-2">
                    {user
                        ? (
                            <>
                                <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-10 h-10 rounded-full" src={user?.picture} alt="user photo" />
                                </button>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
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
                                        <li>
                                            
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
