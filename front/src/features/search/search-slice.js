import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrlLamp } from "../../config";

export const loadSearch = createAsyncThunk(
  '@@search/load-lampList',
  async (search, { rejectWithValue }) => {
    try {
      const response = await baseUrlLamp.get(`/products/title?title=${search}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
    status: 'idle',
    error: null,
    list: [],
    search: '',
}
export const searchSlice = createSlice({
    name: '@@search',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        clearSearch: () => initialState,
    },
        extraReducers: (builder) => {
        builder
          .addCase(loadSearch.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(loadSearch.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload || action.meta.error;
          })
          .addCase(loadSearch.fulfilled, (state, action) => {
           state.status = 'received';
           state.list = action.payload;
          })
      },

})

export const searchReducer = searchSlice.reducer;
export const {setSearch, clearSearch} = searchSlice.actions

//selector

export const selectSearch = (state) => state.search.search;
export const selectSearchInfo = (state) => state.search;
export const selectSearchList = (state) => state.search.list;