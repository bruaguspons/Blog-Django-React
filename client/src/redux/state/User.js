import { createSlice } from '@reduxjs/toolkit'


const emptyUser = {

}
export const UserSlice = createSlice({
    name: 'user',
    initialState: emptyUser,
    reducers: {
        createUser: (state, action) => {
            return action.payload
        },
        modifyUser: (state, action) => {
            return { ...state, ...action.payload }
        },
        resetUser: (state, action) => {
            return emptyUser
        }
    }

})

export const { resetUser, modifyUser, createUser } = UserSlice.actions