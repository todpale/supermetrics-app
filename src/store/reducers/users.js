import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: []
    },
    reducers: {
        saveUsers: (state, action) => {
            state.list = action.payload
        }
    }
})

export const { saveUsers } = usersSlice.actions

export default usersSlice.reducer
