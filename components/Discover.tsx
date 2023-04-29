import React from 'react'
import Link from 'next/link'
import {useRouter} from "next/router";
import {topics} from '../utils/utils/constants'
const Discover = () => {

    const Router = useRouter()
    const {topic} = Router.query

    const ActiveTopicStyle = "xl:border-2 hover:bg-primary xl:border-[#E21818] px-3 py-2 rounded " +
        "xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#E21818]"

    const topicStyle = "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded " +
        "xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"
    return (
        <div className="xl:border-p-2 xl:border-gray-200 pb-6">
            <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
                Popular Topics
            </p>
            <div className="flex gap-3 flex-wrap">
                {topics.map((item) => (
                    <Link href={`/?topic=${item.name}`} key={item.name}>
                        <div className={topicStyle}>
                            <span className="font-bold text-2xl xl:text-md">
                                {item.icon}
                            </span>
                            <span className="font-md text-md hidden xl:block capitalize">
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default Discover
