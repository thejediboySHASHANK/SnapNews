import React, {useState, useEffect} from 'react'
import {MdFavorite} from "react-icons/md";

import userAuthStore from "@/store/authStore";

interface Iprops {
    handleLike: () => void;
    handleDislike: () => void;
    likes: any[];
}

const LikeButton = ({likes, handleLike, handleDislike} : Iprops) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    const {userProfile} : any = userAuthStore()
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true)
        } else {
            setAlreadyLiked(false)
        }
    }, [filterLikes, likes])

    return (
        <div className="flex gap-6">
            <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
                {alreadyLiked ? (
                    <div className="bg-primary rounded-full p-2 md:p-4 text-[#E21818]" onClick={handleDislike}>
                        <MdFavorite className="text-lg md:text-2xl"/>
                    </div>
                ) : (
                    <div className="bg-primary rounded-full p-2 md:p-4" onClick={handleLike}>
                        <MdFavorite className="text-lg md:text-2xl"/>
                    </div>
                )}
                <p className="font-semibold text-md">{likes?.length || 0}</p>
            </div>
        </div>
    )
}
export default LikeButton
