import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrlLamp } from "../../config";


export const loadDetails = createAsyncThunk(
  '@@details/load-details',
  async (id, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await baseUrlLamp.get(`/products/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
const initialState = {
    status: 'idle',
    error: null,
    lamps: {},
}

export const detailsSlice = createSlice({
    name: '@@details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(loadDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadDetails.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadDetails.fulfilled, (state, action) => {
       state.status = 'received';
       state.lamps[action.payload.id] = action.payload;
      })
  },
})

export const detailsReducer = detailsSlice.reducer;

//selector

export const selectDetails = (state, id) => state.details.lamps[id];
export const selectDetailsInfo = (state) => state.details;