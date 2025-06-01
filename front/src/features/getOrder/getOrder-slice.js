import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postUrl } from '../../config';

export const createOrder = createAsyncThunk(
  '@@order/create-order',
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await postUrl.post('/order', newOrder);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const initialState = {
  orders: [],
};
const orderSlice = createSlice({
  name: '@@order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'creating';
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'created';
        state.orders = [...state.orders, action.payload];
      });
  },
});

export const orderReducer = orderSlice.reducer;

// selector

export const selectOrders = (state) => state.order.orders;
