import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {useState, useEffect} from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { GoogleOAuthProvider } from '@react-oauth/google';

const App = ({Component, pageProps}: AppProps) => {
    const [isSSR, setIsSSR] = useState(true)

    useEffect(() => {
        setIsSSR(false)
    }, [])


    if (isSSR) return null
    return (
        <GoogleOAuthProvider clientId="558428637987-lf3erfv97sbnn2vkplkvqa7difed0q6d.apps.googleusercontent.com">
            <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
                <Navbar />
                <div className="flex gap-6 md:gap-20">
                    <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
                        <Sidebar />
                    </div>
                    {/*<Sidebar/>*/}
                    <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>

        </GoogleOAuthProvider>
    )
}
export default App