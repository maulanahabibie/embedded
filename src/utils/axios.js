import axios from 'axios';
import { API_HIT } from '../config/api';
import { clearStore } from '../features/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: `${API_HIT}`,
});

customFetch.interceptors.request.use((config) => {
  const token = getUserFromLocalStorage();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
