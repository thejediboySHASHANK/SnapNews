import React, {useState} from "react";
import Image from "next/legacy/image"
import {GoVerified} from "react-icons/go";
import axios from "axios"
import Link from "next/link"
import {useRouter} from "next/router";

import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import {IUser, Video} from "@/types";
import {BASE_URL} from "@/utils/utils";
import userAuthStore from "@/store/authStore";

const Search = ({videos}: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false)
    const router = useRouter()
    const {searchTerm} : any = router.query
    const {allUsers} = userAuthStore()

    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'

    const searchedAccounts = allUsers.filter((user : IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="w-full">
            <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                <p onClick={() => setIsAccounts(true)}
                   className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}>Accounts</p>
                <p onClick={() => setIsAccounts(false)}
                   className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}>Videos</p>
            </div>
            {isAccounts ? (
                <div className="md:mt-16">
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser, idx : number) => (
                            <Link key={idx} href={`/profile/${user._id}`}>
                                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200" key={idx}>
                                    <div>
                                        <Image
                                            src={user.image}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                            alt="user profile"
                                        />
                                    </div>

                                    <div className="hidden xl:block">
                                        <p className="flex gap-1 items-center text-md font-semibold text-primary lowercase">
                                            {user.userName.replaceAll(" ", "")}
                                            <GoVerified className="text-blue-400"/>
                                        </p>
                                        <p className="capitalize text-gray-400 text-xs">
                                            {user.userName}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : <NoResults text={`No account results for ${searchTerm}`}/>
                    }
                </div>
            ) : (
                <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
                    {videos.length ? (
                        videos.map((video: Video, idx: number) => (
                            <VideoCard post={video} key={idx}/>
                        ))
                    ) : <NoResults text={`No video results for ${searchTerm}`}/>
                    }
                </div>
            )}
        </div>
    )
}

export const getServerSideProps = async ({
                                             params: {searchTerm}
                                         }: {
    params: { searchTerm: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: {videos: res.data}
    }
}
export default Search
