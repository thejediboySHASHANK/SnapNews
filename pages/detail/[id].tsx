import React, {useState, useEffect, useRef} from 'react'
import {useRouter} from "next/router";
import Image from "next/image"
import Link from "next/link"
import {GoVerified} from "react-icons/go";
import {MdOutlineCancel} from "react-icons/md";
import {BsPlayFill} from "react-icons/bs";
import {HiVolumeUp, HiVolumeOff} from "react-icons/hi";
import axios from "axios";
import {BASE_URL} from "@/utils/utils";
import {Video} from "@/types";
import userAuthStore from "@/store/authStore";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";


interface Iprops {
    postDetails: Video
}

const Detail = ({postDetails}: Iprops) => {
    const [post, setPost] = useState(postDetails)
    const [playing, setPlaying] = useState(false)
    const [isVideoMuted, setIsVideoMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const router = useRouter()
    const {userProfile}: any = userAuthStore()
    const [comment, setComment] = useState('')
    const [isPostingComment, setIsPostingComment] = useState(false)
    const onVideoClick = () => {
        if (playing) {
            videoRef?.current?.pause()
            setPlaying(false)
        } else {
            videoRef?.current?.play()
            setPlaying(true)
        }
    }

    useEffect(() => {
        if (post && videoRef?.current) {
            videoRef.current.muted = isVideoMuted
        }
    }, [post, isVideoMuted])

    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const {data} = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            })

            setPost({...post, likes: data.likes})
        }
    }

    const addComment = async (e) => {
        e.preventDefault()
        if (userProfile && comment) {
            setIsPostingComment(true)
            const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                userId: userProfile._id,
                comment
            })

            setPost({...post, comments: data.comments})
            setComment('')
            setIsPostingComment(false)
        }
    }


    if (!post) return null;

    return (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
            <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
                <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
                    <p className="cursor-pointer" onClick={() => router.back()}>
                        <MdOutlineCancel className="text-white text-[35px] hover:text-[42px]"/>
                    </p>
                </div>
                <div className="relative">
                    <div className="lg:h-[100vh] h-[60vh]">
                        <video
                            ref={videoRef}
                            loop
                            onClick={onVideoClick}
                            src={post.video.asset.url}
                            className="h-full cursor-pointer"
                        >
                        </video>
                    </div>

                    <div className="absolute bottom-[5%] left-[5%] cursor-pointer">
                        {!playing && (
                            <button onClick={onVideoClick}>
                                <BsPlayFill className="text-white text-6xl lg:text-8xl"/>
                            </button>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
                    {isVideoMuted ? (
                        <button onClick={() => setIsVideoMuted(false)}>
                            <HiVolumeOff className="text-white text-2xl lg:text-4xl"/>
                        </button>
                    ) : (
                        <button onClick={() => setIsVideoMuted(true)}>
                            <HiVolumeUp className="text-white text-2xl lg:text-4xl"/>
                        </button>
                    )}
                </div>
            </div>

            <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                <div className="lg:mt-20 mt-10">
                    <div className="flex">
                        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
                                <Link href="/">
                                    <>
                                        <Image
                                            width={62}
                                            height={62}
                                            className="rounded-full"
                                            src={post.postedBy.image}
                                            alt="profile photo"
                                            layout="responsive"
                                        />
                                    </>
                                </Link>
                            </div>
                        </div>
                        <Link href="/">
                            <div className="mt-3 flex flex-col gap-2">
                                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                                    {post.postedBy.userName}
                                    <div className="text-blue-400 text-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6">
                                            <path fill-rule="evenodd"
                                                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </p>
                                <p className="capitalize ml-2 font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
                            </div>
                        </Link>
                    </div>
                </div>
                {/*<div className="mt-2 border-b-2 border-gray-200"></div>*/}
                <p className="px-10 mt-2 text-xl font-semibold">{post.caption}</p>
                <div className="mt-6 mb-6 px-10">
                    {userProfile && (
                        <LikeButton
                            likes={post.likes}
                            handleLike={() => handleLike(true)}
                            handleDislike={() => handleLike(false)}
                        />
                    )}
                </div>
                <Comments
                    comment={comment}
                    setComment={setComment}
                    addComment={addComment}
                    comments={post.comments}
                    isPostingComment={isPostingComment}
                />
            </div>
        </div>
    )
}

export const getServerSideProps = async ({params: {id}}: {
    params: { id: string }
}) => {
    const {data} = await axios.get(`${BASE_URL}/api/post/${id}`)

    return {
        props: {postDetails: data}
    }
}
export default Detail
