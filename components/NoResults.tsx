import React from 'react'
import {NextPage} from "next";
import {MdOutlineVideocamOff} from "react-icons/md";
import {BiCommentEdit} from "react-icons/bi";

interface IProps {
    text: string
}
const NoResults = ({text}: IProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <p className="text-8xl">
                {text === 'Be the first to comment!'
                    ? <BiCommentEdit/>
                    : <MdOutlineVideocamOff/>
                }
            </p>
            <p className="text-2xl text-center">{text}</p>
        </div>
    )
}
export default NoResults
