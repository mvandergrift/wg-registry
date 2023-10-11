import "./globals.css";
import type { Metadata } from "next"
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
    title: "API Registry",
    description: "Register your APIs and manage their lifecycle"
}

export default function RootLayout ({ children }: { children: React.ReactNode }) {		
    return (
        <html lang="en">		
            <body className='bg-gray-100 dark:bg-gray-800'>
                <Navbar />
                <Sidebar />
                <main className='sm:ml-48 sm:p-6'>
                    <div className='sm:mt-12'>
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
