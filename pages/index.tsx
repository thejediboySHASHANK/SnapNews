import {NextPage} from "next";
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})
import axios from "axios";
import {Video} from "@/types";
import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import {BASE_URL} from "@/utils/utils";
import {fetchFromAPI} from "../utils/utils/fetchFromAPI.js"

interface IProps {
    videos: Video[]
}

const Home = ({videos}: IProps) => {
    console.log(videos)
    return (
        <>
            <div className="flex flex-col gap-10 videos h-full">
                {videos.length ? (
                    videos.map((video: Video) => (
                        <VideoCard post={video} key={video._id}/>
                        // <h1>Yo</h1>
                    ))
                ) : (
                    <NoResults text={'No Videos'}/>
                    // <h1>No</h1>
                )}
            </div>
        </>
    )
}

export const getServerSideProps = async ({
                                             query: {topic}
                                         }: {
    query: { topic: string }
}) => {
    let response = null
    if (topic) {
        response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    } else {
        response = await axios.get(`${BASE_URL}/api/post`);
    }
    // console.log (response.data)
    return {
        props: {
            videos: response.data
        }

    }
}

export default Home
