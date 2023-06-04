import customFetch from "./axios"

export const createDepartement = async (payload) => {
    var result= {code: "0", msg: "", id: null}
    try {
        const res = await customFetch.post("/departements", {data: payload});
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.name = res.data.attributes.name || "";
            result.id   = res.data.id || payload.id || 0;
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

export const updateDepartement = async (payload) => {
    var result= {code: "0", msg: "", id: null, name: ''}
    try {
        const res = await customFetch.put(`/departements/${payload.id}`, {data: payload});
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.name = res.data.attributes.name || "";
            result.id   = res.data.id || payload.id || 0;
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

export const deleteDepartement = async (payload) => {
    var result= {code: "0", msg: "Faied", id: null, name: ''}
    try {
        const res = await customFetch.delete(`/departements/${payload.id}`);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success Delete';
            result.name = res.data.attributes.name || "";
            result.id   = res.data.id || payload.id || 0;
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

//EMBEDDED
export const createEmbedded = async (payload) => {
    var result= {code: "0", msg: "", id: null, name: ''}
    try {
        const res = await customFetch.post("/embeddeds", {data: payload});
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.name = res.data.attributes.name || "";
            result.id   = res.data.id || payload.id || 0
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

export const updateEmbedded = async (payload) => {
    var result= {code: "0", msg: "", id: null, name: ''}
    try {
        const res = await customFetch.put(`/embeddeds/${payload.id}`, {data: payload});
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.name = res.data.attributes.name || "";
            result.id   = res.data.id || payload.id || 0
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

export const deleteEmbedded = async (payload) => {
    var result= {code: "0", msg: "", id: null, name: ''}
    try {
        const res = await customFetch.delete(`/embeddeds/${payload.id}`);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success Delete';
            result.name = res.data.attributes.name || "";
            result.id   = res.data.id || payload.id || 0;
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

//LIST
export const listDepartements = async () => {
    var result= {code: "0", msg: "", data: []}
    try {
        const res = await customFetch.get(`/departements`);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.data = res.data.data || []
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}
export const listEmbeddeds = async () => {
    var result= {code: "0", msg: "", data: []}
    try {
        const res = await customFetch.get(`/embeddeds`);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.data = res.data.data || [];
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

export const listUserById = async (id) => {
    var result= {code: "0", msg: "", data: []}
    try {
        const res = await customFetch.get(`/users/${id}?populate=*`);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.data = res.data || [];
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}
export const registerUsersForm = async (payload) => {
    var result= {code: "0", msg: "", user: ''}
    try {
        const res = await customFetch.post(`/users`, payload);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.user = res.data.user.username || "";
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}
export const updateUsersForm = async (payload) => {
    var result= {code: "0", msg: "", user: ''}
    try {
        const res = await customFetch.put(`/users/${payload.id}`, payload);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
            result.user = res.data.user.username || "";
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}

export const deleteUserForm = async (payload) => {
    var result= {code: "0", msg: ""}
    try {
        const res = await customFetch.delete(`/users/${payload}`);
        if(res.data){
            result.code = '1';
            result.msg  = 'Success';
        }
        return result
    } catch (error) {
        if(error.response) result.msg  = error.response.data.error.message || "Failed";
        return result
    }
}