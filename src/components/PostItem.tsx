import React, { FC, ReactElement } from 'react'

import { PostInterface } from "../types";

interface Props {
    data: PostInterface
}

const PostItem: FC<Props> = (props): ReactElement => {

    const { created_time, message } = props.data

    const splitTime = new Date(created_time).toUTCString().split(' ')
    /**
     * 0: 'Thu,'
     * 1: '12'
     * 2: 'May'
     * 3: '2022'
     * 4: '01:33:03'
     * 5: 'GMT'
     */
    const formattedTime = `${splitTime[2]} ${splitTime[1]}, ${splitTime[3]} ${splitTime[4]}`

    return (
        <div className="post-item">
            <div className="post-date">
                <span>{ formattedTime }</span>
            </div>
            <div className="post-text">
                <p>{ message }</p>
            </div>
        </div>
    )
}

export default PostItem
