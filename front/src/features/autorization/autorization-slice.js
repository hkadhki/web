import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUrlAdmin } from "../../config";


export const loadAutorization = createAsyncThunk(
  '@@admin/load-admin',
  async (dataAdmin, { rejectWithValue }) => {
    try {
      const response = await postUrlAdmin.post('/auth/login', dataAdmin);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const initialState = {
  tokin: '',
  error: null,
  status: 'idle',
};
const autorizationSlice = createSlice({
  name: '@@admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAutorization.pending, (state) => {
        state.status = 'creating';
        state.error = null;
      })
      .addCase(loadAutorization.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadAutorization.fulfilled, (state, action) => {
        state.status = 'created';
        state.tokin = action.payload;
      });
  },
});

export const autorizationrReducer = autorizationSlice.reducer;

// selector

export const selectAdmin = (state) => state.admin.tokin;
export const selectAdminInfo = (state) => state.admin;


