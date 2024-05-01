import React, {useState} from 'react'
import Image from "next/legacy/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {createOrGetUser} from "@/utils/utils";

import userAuthStore from "@/store/authStore";
import {BiSearch} from "react-icons/bi";
import {BsGlobeCentralSouthAsia} from "react-icons/bs"
import {router} from "next/client";

const Navbar = () => {
    const {userProfile, addUser, removeUser} = userAuthStore()
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()
    const handleSearch = (e : {preventDefault : () => void}) => {
        e.preventDefault()

        if(searchValue) {
            router.push(`/search/${searchValue}`)
        }
    }

    return (
        <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
            <Link href='/'>
                <div className="">
                    {/*<Image className="cursor-pointer" src={Logo} alt="SnapNews" layout="responsive"/>*/}
                    <div className="text-[#E21818] flex justify-center gap-2.5">
                        <div className="mt-1 ml-2 text-2xl">
                            {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"*/}
                            {/*     className="w-6 h-6">*/}
                            {/*    <path*/}
                            {/*        d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z"/>*/}
                            {/*    <path fill-rule="evenodd"*/}
                            {/*          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z"*/}
                            {/*          clip-rule="evenodd"/>*/}
                            {/*</svg>*/}
                            <BsGlobeCentralSouthAsia />
                        </div>

                        <div className="font-bold text-2xl">
                            SnapNews
                        </div>
                    </div>
                </div>
            </Link>

            <div className="relative hidden md:block">
                <form
                    onSubmit={handleSearch}
                    className="absolute md:static top-10 -left-20 bg-white"
                >
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search accounts and videos"
                        className="bg-primary px-6 p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-500"
                    >
                        <BiSearch/>
                    </button>
                </form>
            </div>

            <div>
                {userProfile ? (
                    <div className="flex gap-3 md:gap-7">
                        <Link href="/upload">
                            <button className="border-2 py-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded-3xl">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path fill-rule="evenodd"
                                          d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                                          clip-rule="evenodd"/>
                                </svg> {' '}
                                <span className="hidden md:block">Upload</span>{' '}
                            </button>
                        </Link>
                        {/*{userProfile.userName}*/}
                        {userProfile.image && (
                            <Link href="/">
                                <>
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full cursor-pointer"
                                        src={userProfile.image}
                                        alt="profile photo"
                                    />
                                </>
                            </Link>
                        )}
                        <button
                            type="button"
                            className="px-2"
                            onClick={() => {
                                googleLogout()
                                removeUser()
                            }}
                        >
                            <div className="border-2 bg-red-200 py-2 px-2 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6 accent-red-500 cursor-pointer">
                                    <path fill-rule="evenodd"
                                          d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div>
                        <GoogleLogin
                            onSuccess={(response) => createOrGetUser(response, addUser)}
                            onError={() => console.log ('Error')}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
export default Navbar
