import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
    name: "search",
    initialState: '',
    reducers: {
        createSearch: (state, action) => {
            return action.payload
        },
        resetSearch: (state, action) => {
            return ''
        }
    }
})

export const { createSearch, resetSearch } = SearchSlice.actions