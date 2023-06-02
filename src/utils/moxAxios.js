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