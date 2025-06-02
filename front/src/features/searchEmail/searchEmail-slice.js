import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {baseUrlLamp, baseUrlOrder} from "../../config";


export const loadSearchEmail = createAsyncThunk(
  '@@search/load-lampList',
  async (email, { rejectWithValue }) => {
    try {
      const response = await baseUrlOrder.get(`/order?email=${email}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const initialState = {
    status: 'idle',
    error: null,
    email: '',
    order: [],
}
export const searchEmailSlice = createSlice({
    name: '@@email',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        clearEmail: () => initialState,
    },
    extraReducers: (builder) => {
            builder
              .addCase(loadSearchEmail.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(loadSearchEmail.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || action.meta.error;
              })
              .addCase(loadSearchEmail.fulfilled, (state, action) => {
               state.status = 'received';
               state.order = action.payload;
              })
          },
})

export const emailReducer = searchEmailSlice.reducer;
export const {setEmail, clearEmail} = searchEmailSlice.actions;

//selector
export const selectOrderForEmail = (state) => state.email.order;
export const selectEmail = (state) => state.email.email;
export const selectEmailInfo = (state) => state.email;