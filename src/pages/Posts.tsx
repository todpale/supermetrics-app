import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { savePosts } from "../store/reducers/posts";
import { saveUsers } from "../store/reducers/users";

import UserItem from "../components/UserItem";
import PostItem from "../components/PostItem";
import Search from "../components/Search";
import Sorter from "../components/Sorter";

import { PostInterface, PostsList, UserInterface, UsersList } from "../types";

import { ajax } from "../helpers/api";
import { API_URL } from "../helpers/constants";
import { getCookie } from "../helpers/cookies";
import {copy, searchParam} from "../helpers/common";

const Posts: FC = (): ReactElement => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const posts = useSelector((state: { posts: PostsList }) => state.posts.list)
    const users = useSelector((state: { users: UsersList }) => state.users.list)

    /**
     * Selected user for getting his/her posts
     */
    const [selectedUser, setSelectedUser] = useState<string>('')
    /**
     * Posts and users using for search
     */
    const [currentPosts, setCurrentPosts] = useState<PostInterface[]>([])
    const [currentUsers, setCurrentUsers] = useState<UserInterface[]>([])

    /**
     * Saved posts sorting
     */
    const [postsSort, setPostsSort] = useState<string>('')

    /**
     * Loading before API response
     */
    const [isLoading, setIsLoading] = useState<boolean>(true)

    /**
     * Get posts from API
     */
    useEffect(() => {
        const token = getCookie('sl_token')
        if (typeof token === 'undefined') {
            navigate('/auth', { replace: true })
        } else {
            ajax(`${API_URL}/posts?sl_token=${token}&page=1`, {}, 'get').then(res => {
                //@ts-ignore
                dispatch(savePosts(res.data.data.posts))
                setIsLoading(false)
            })
        }
    }, [])

    useEffect(() => {
        if (posts.length !== 0) {
            sortPostsByDate()
            const usersBuffer: UserInterface[] = []

            /**
             * Get users from posts list
             */
            currentPosts.forEach(el => {
                usersBuffer.push({
                    user_id: el.from_id,
                    name: el.from_name
                })
            })

            /**
             * Get unique users only
             */
            const uniqueUsers = usersBuffer.filter((el, index) => {
                return usersBuffer.findIndex((user) => user.user_id === el.user_id) === index
            }).sort((a, b) => a.name.localeCompare(b.name))

            /**
             * Get user posts amount
             */
            uniqueUsers.map((user) => {
                return user.postsAmount = currentPosts.filter((post) => post.from_id === user.user_id).length
            })

            //@ts-ignore
            dispatch(saveUsers(uniqueUsers))
            setCurrentUsers(uniqueUsers)

            /**
             * Get user and posts from URL
             */
            const userId = searchParam('user_id')
            if (userId !== null) {
                setCurrentUsers(uniqueUsers.filter(el => el.user_id === userId))
                setCurrentPosts(posts.filter(post => post.from_id === userId))
            }
        }
    }, [posts])

    /**
     * Set posts for selected user
     */
    useEffect(() => {
        if (selectedUser !== '') {
            setPostsSort('DESC')
            setCurrentPosts(posts.filter(post => post.from_id === selectedUser))
        }
    }, [selectedUser])

    /**
     * Set posts sorting by selected sort type
     */
    useEffect(() => {
        if (postsSort !== '') {
            sortPostsByDate(currentPosts, postsSort)
        }
    }, [postsSort])

    /**
     * Make search by string and kind of searchable items
     * @param subject
     * @param type
     */
    const makeSearch = (subject: string, type: string) => {
        setCurrentUsers(users)
        sortPostsByDate()
        setPostsSort('DESC')
        if (type === 'users') {
            setCurrentUsers(users.filter(user => user.name.includes(subject)))
        } else if (type === 'posts') {
            setCurrentPosts(posts.filter(post => post.message.includes(subject)))
        }
    }

    /**
     * Sort posts by date
     * @param postArray
     * @param type
     */
    const sortPostsByDate = (postArray: PostInterface[] = posts, type: string = 'DESC') => {
        const copied: PostInterface[] = copy(postArray)
        const sorted = copied.sort((a, b) => type === 'ASC'
                ? +new Date(a.created_time) - +new Date(b.created_time)
                : +new Date(b.created_time) - +new Date(a.created_time)
        )
        setCurrentPosts(sorted)
    }

    /**
     * Main page content (to avoid the cognitive complexity of component return)
     */
    const pageContent = () => (
        <div className="posts">
            <div className="posts-control">
                <div className="user-search">
                    <Search
                        placeholder="Enter username"
                        onSearch={(value) => makeSearch(value, 'users')}
                    />
                </div>
                <div className="posts-sort">
                    <Sorter
                        clicked={ postsSort }
                        onSelect={(type) => setPostsSort(type)}
                    />
                </div>
                <div className="posts-search">
                    <Search
                        placeholder="Enter post message"
                        onSearch={(value) => makeSearch(value, 'posts')}
                    />
                </div>
            </div>
            <div className="posts-elements">
                <div className="posts-users">
                    { currentUsers.length > 0
                        ? (
                            <>
                                { currentUsers.map((user, uIndex) => (
                                    <UserItem
                                        key={ `user${uIndex}` }
                                        data={ user }
                                        active={ user.user_id === selectedUser }
                                        onSelectUser={(userId) => setSelectedUser(userId)}
                                    />
                                )) }
                            </>
                        )
                        : (
                            <>No users found 😓</>
                        )
                    }
                </div>
                <div className="posts-content">
                    { currentPosts.length > 0
                        ? (
                            <>
                                { currentPosts.map((post, pIndex) => (
                                    <PostItem
                                        key={ `post${pIndex}` }
                                        data={ post }
                                    />
                                )) }
                            </>
                        )
                        : (
                            <>No posts found 😓</>
                        )
                    }
                </div>
            </div>
        </div>
    )


    return (
       <>
           { isLoading
               ? <div className="posts">
                   <p style={{ textAlign: 'center' }}>Loading...</p>
                </div>
               : pageContent()
           }
       </>
    )
}

export default Posts
