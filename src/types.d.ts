interface PostInterface {
    id: string;
    from_name: string;
    from_id: string;
    message: string;
    type: string;
    created_time: string;
}
export interface PostsList {
    list: PostInterface[]
}

export interface UserInterface {
    user_id: string;
    name: string;
    postsAmount?: number;
}
export interface UsersList {
    list: UserInterface[]
}
