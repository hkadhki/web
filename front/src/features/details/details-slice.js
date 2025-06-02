import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrlLamp } from '../../config';

export const loadDetails = createAsyncThunk(
  '@@details/load-details',
  async (id, { rejectWithValue }) => {
    try {
      const response = await baseUrlLamp.get(`/products/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const updateDetails = createAsyncThunk(
  '@@details/update-details',
  async ({ detailsInfo, id, token }, { rejectWithValue }) => {
    try {
      const response = await baseUrlLamp.patch(`/products/${id}`, detailsInfo, {
        headers: { Authorization : `Bearer ${token}`,
        'Content-Type': 'application/json'},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const deleteDetails = createAsyncThunk(
  '@@details/delete-details',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await baseUrlLamp.delete(`/products/${id}`, {
        headers: { Authorization : `Bearer ${token}`},
      });
      return {id};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  status: 'idle',
  error: null,
  lamps: {},
};

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
      .addCase(updateDetails.pending, (state) => {
        state.status = 'updating';
        state.error = null;
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.status = 'updated';
        state.lamps[action.payload.id] = action.payload; 
      })
        .addCase(deleteDetails.pending, (state) => {
        state.status = 'delete';
        state.error = null;
      })
      .addCase(deleteDetails.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(deleteDetails.fulfilled, (state, action) => {
        state.status = 'deleted';
        delete state.lamps[action.payload.id];
      })
  },
});

export const detailsReducer = detailsSlice.reducer;

//selector

export const selectDetails = (state, id) => state.details.lamps[id];
export const selectDetailsInfo = (state) => state.details;
