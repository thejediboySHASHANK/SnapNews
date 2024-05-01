import React, {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import axios from "axios";
import {SanityAssetDocument} from "@sanity/client";

import userAuthStore from "@/store/authStore";
import {client} from "@/utils/utils/client";
import {topics} from "@/utils/utils/constants";
import {BASE_URL} from "@/utils/utils";

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
    const [wrongFileType, setWrongFileType] = useState(false)
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState(topics[0])
    const [savingPost, setSavingPost] = useState(false)

    const {userProfile}: { userProfile: any } = userAuthStore()
    const router = useRouter()
    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

        if (fileTypes.includes(selectedFile.type)) {
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            })
                .then((data) => {
                    setVideoAsset(data)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
            setWrongFileType(true)
        }
    }

    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setSavingPost(true)

            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            await axios.post(`${BASE_URL}/api/post`, document);
            router.push('/')
        }
    }

    return (
        <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
            <div className="bg-white rounded-lg xl:h-[80vh] md:w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
                <div>
                    <div>
                        <div>
                            <p className="text-2xl font-bold">Upload Video</p>
                            <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
                        </div>
                    </div>
                    <div className="border-double rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none
                                mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                        {isLoading ? (
                            <p>Uploading...</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video
                                            src={videoAsset.url}
                                            loop
                                            controls
                                            className="rounded-xl h-[450px] mt-16 bg-black"
                                        >

                                        </video>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="flex flex-col items-center justify-center">
                                                <p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                         fill="currentColor" className="w-12 h-12 text-gray-300">
                                                        <path fill-rule="evenodd"
                                                              d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
                                                              clip-rule="evenodd"/>
                                                    </svg>
                                                </p>
                                                <p className="text-md font-semibold mt-1">
                                                    Upload Video
                                                </p>
                                            </div>
                                            <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                                                MP4 or WebM or ogg <br/>
                                                720x1280 or higher <br/>
                                                Up to 10 minutes <br/>
                                                <span className="underline">Less than 2GB</span>
                                            </p>
                                            <p className="bg-[#E21818] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                                                Select File
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name="upload-video"
                                            onChange={uploadVideo}
                                            className="w-0 h-0"
                                        />
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType && (
                            <p className="text-center text-lg text-red-400 font-semibold mt-4 w-[250px]">
                                Wrong Video Format Type
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-3 pb-10">
                    <label className="text-md font-medium">Caption</label>
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="rounded outline-none text-md border-2 border-gray-200 p-2"
                    />
                    <label className="text-md font-medium">Choose a Category</label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                    >
                        {topics.map((topic) => (
                            <option
                                key={topic.name}
                                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                value={topic.name}
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-6 mt-10">
                        <button
                            onClick=""
                            type="button"
                            className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                        >
                            Discard
                        </button>
                        <button
                            onClick={handlePost}
                            type="button"
                            className="bg-[#E21818] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Upload
