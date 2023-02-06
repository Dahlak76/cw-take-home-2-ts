// apiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface ApiState {
  response: string;
  loading: boolean;
  error: string | null;
}

const initialState: ApiState = {
  response: '',
  loading: false,
  error: null,
} 

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setResponse, setLoading, setError } = apiSlice.actions;

export const fetchData = (payload: string) => async (dispatch: (arg0: { payload: string | undefined; type: "api/setResponse" | "api/setLoading" | "api/setError"; }) => void) => {
  try {
    dispatch(setLoading());
    const response = await axios.post('http://localhost:3007/transform', { payload });
    dispatch(setResponse(response.data.transformedPayload));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export default apiSlice.reducer;
