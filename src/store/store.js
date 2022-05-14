import { configureStore } from '@reduxjs/toolkit'

import postsReducer from './reducers/posts'
import usersReducer from './reducers/users'

const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
})

export default store
