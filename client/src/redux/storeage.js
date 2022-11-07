import { configureStore } from '@reduxjs/toolkit'
import { UserSlice } from './state/User'

export default configureStore({
    reducer: {
        user: UserSlice.reducer
    }
})