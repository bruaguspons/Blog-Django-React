import { configureStore } from '@reduxjs/toolkit'
import { SearchSlice } from './state/Search'
import { UserSlice } from './state/User'

export default configureStore({
    reducer: {
        user: UserSlice.reducer,
        search: SearchSlice.reducer
    }
})