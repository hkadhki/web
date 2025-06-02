import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrlOrder} from '../../config';

export const statusOrder = createAsyncThunk(
  '@@statusOrder/status-order',
  async ({id, token , statusCurrentOrders}, { rejectWithValue }) => {
    try {
      const response = await baseUrlOrder.put(`/order/${id}?status=${statusCurrentOrders}`,null ,{
        headers: { Authorization : `Bearer ${token}`},
      });
       return { id, status: statusCurrentOrders }; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const initialState = {
status: 'idle',
  error: null,
  statusOrder: {},
};
const statusOrderSlice = createSlice({
  name: '@@statusOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(statusOrder.pending, (state) => {
        state.status = 'creating';
        state.error = null;
      })
      .addCase(statusOrder.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(statusOrder.fulfilled, (state, action) => {
        state.status = 'created';
        state.statusOrder = {
          ...state.statusOrder,
          [action.payload.id]: action.payload.status
        };
      });
  },
});

export const statusOrderReducer = statusOrderSlice.reducer;

// selector

export const selectStatusOrders = (state) => state.statusOrder.statusOrder;
