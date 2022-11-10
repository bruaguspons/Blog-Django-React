import { createSlice } from '@reduxjs/toolkit'


const emptyUser = {
    name: '',
    email: '',
    token: '',
    id: ''
}
export const UserSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : emptyUser,
    reducers: {
        createUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return action.payload
        },
        modifyUser: (state, action) => {
            const userValue = { ...state, ...action.payload }
            localStorage.setItem('user', JSON.stringify(userValue))
            return userValue
        },
        resetUser: (state, action) => {
            return localStorage.removeItem('user')
        }
    }

})

export const { resetUser, modifyUser, createUser } = UserSlice.actions