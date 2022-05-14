import React, { FC, ReactElement } from 'react'
import { UserInterface } from "../types";

interface Props {
    data: UserInterface;
    active: boolean;
    onSelectUser: (userId: string) => void;
}

const UserItem: FC<Props> = (props): ReactElement => {

    const { data, active, onSelectUser } = props

    const currentClass = active ? 'user-item active' : 'user-item'

    return (
        <div
            className={ currentClass }
            onClick={() => onSelectUser(data.user_id)}
        >
            <span className="user-name">
                { data.name }
            </span>
            <span className="user-posts">
                { data.postsAmount }
            </span>
        </div>
    )
}

export default UserItem
