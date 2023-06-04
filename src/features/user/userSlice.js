import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CONDITIONAL } from '../../config/api';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  getUserRole,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
  loginUserCheckThunk,
} from './userThunk';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  token: getUserFromLocalStorage() || null,
  role: getUserRole()|| null,
  user: [],
  userData: [],
  userList: []
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    if(CONDITIONAL) return registerUserThunk('/auth/local/register', user, thunkAPI);
    else return registerUserThunk('/auth/register', user, thunkAPI);
  
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    if(CONDITIONAL) return loginUserThunk('/auth/local', user, thunkAPI);
    else return loginUserThunk('/auth/login', user, thunkAPI);
  }
);

export const loginUserCheck = createAsyncThunk(
  'user/getUserLogin',
  async (user, thunkAPI) => {
    return loginUserCheckThunk('/users/me', user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.token = null
      state.user = null;
      state.userData = null;
      state.role = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        // state.user = user;
        addUserToLocalStorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user, jwt='' } = payload;
        state.isLoading = false;
        // state.user = user;
        state.token = jwt;
        addUserToLocalStorage(jwt, user.code);

        toast.success(`Welcome Back ${user.username}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUserCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserCheck.fulfilled, (state, { payload }) => {
        const {user, userData, userList}=payload
        state.isLoading = false;
        state.user = user;
        state.role = user.code;
        state.userData = userData;
        state.userList = userList;
      })
      .addCase(loginUserCheck.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearStore.rejected, () => {
        toast.error('There was an error..');
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
