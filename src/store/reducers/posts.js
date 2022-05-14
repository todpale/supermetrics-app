import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: []
    },
    reducers: {
        savePosts: (state, action) => {
            state.list = action.payload
        }
    }
})

export const { savePosts } = postsSlice.actions

export default postsSlice.reducer
