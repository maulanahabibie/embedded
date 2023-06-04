import { roleCms } from '../../config/role';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';
import { logoutUser } from './userSlice';
export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.message || error.response.data.error.msg || "Failed Login");
  }
};

export const loginUserCheckThunk = async (url, thunkAPI) => {
  try {
    var init={user: null, userList: null}

    var resp = await customFetch.get(url);
    var specifikasi = roleCms(resp.data.code)
    if(!specifikasi.show) init.user = await customFetch.get(`/users/${resp.data.id}?populate=*`);
    else {
      const listUsers = await customFetch.get(`/users`);
      const listDepartements = await customFetch.get(`/departements`)
      const listEmbeddeds = await customFetch.get(`/embeddeds`)

      init.user = {
        data : {
          ...resp.data,
          departementId : listDepartements.data.data.length && listDepartements.data.data.map(d=>({
            id: d.id,
            createdAt   : d.attributes.createdAt || "",
            name        : d.attributes.name || "",
            publishedAt : d.attributes.publishedAt || "",
            slug        : d.attributes.slug || "",
            updatedAt   : d.attributes.updatedAt || "",
            url         : d.attributes.url || "",
          })) || [],
          embeddedId    : listEmbeddeds.data.data.length && listEmbeddeds.data.data.map(d=>({
            id : d.id,
            createdAt       : d.attributes.createdAt || "",
            description     : d.attributes.description || "",
            image           : d.attributes.image || "",
            name            : d.attributes.name || "", 
            publishedAt     : d.attributes.publishedAt || "",
            slug            : d.attributes.slug || "",
            slugDepartement : d.attributes.slugDepartement || "",
            source          : d.attributes.source || "",
            updatedAt       : d.attributes.updatedAt || "",
          })) || []
        }
      }

      init.userList = listUsers.data || [];
    }
    return {user: resp.data, userData: init.user.data, userList: init.userList};
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.message || error.response.data.error.msg || "Failed Login");
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
