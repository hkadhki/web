import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrlLamp } from "../../config";

export const loadLamp = createAsyncThunk(
  '@@lamp/load-lamp',
  async (_, { rejectWithValue }) => {
    try {
      const response = await baseUrlLamp.get('/products');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createLamp = createAsyncThunk(
  '@@lamp/create-lamp',
  async ({cardInfo, token}, { rejectWithValue }) => {
    try {
      const response = await baseUrlLamp.post('/products', cardInfo, {
        headers: { Authorization : `Bearer ${token}`},
        },);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
    status: 'idle',
    error: null,
    list: []
}

export const lampSlice = createSlice({
    name: '@@lamp',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(loadLamp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadLamp.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadLamp.fulfilled, (state, action) => {
       state.status = 'received';
       state.list = action.payload;
      })
       .addCase(createLamp.pending, (state) => {
        state.status = 'creating';
        state.error = null;
      })
      .addCase(createLamp.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(createLamp.fulfilled, (state, action) => {
        state.status = 'created';
        state.list = [...state.list, action.payload];
      });
  },
})

export const lampReducer = lampSlice.reducer;

//selector

export const selectLampList = (state) => state.lamp.list;
export const selectLampListInfo = (state) => state.lamp;