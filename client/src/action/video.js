import * as api from "../Api";

export const uploadvideo = (videodata) => async (dispatch) => {
    try {
        const { filedata, fileoption } = videodata;
        console.log(filedata,fileoption)
        const { data } = await api.uploadvideo(filedata, fileoption)
        dispatch({ type: 'POST_VIDEO', data })
        dispatch(getallvideo())
    } catch (error) {
        alert(error.response.data.message)
    }
}

  

export const getallvideo = () => async (dispatch) => {
    try {
        const { data } = await api.getvideos()
        dispatch({ type: 'FETCH_ALL_VIDEOS', payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const likevideo = (likedata) => async (dispatch) => {
    try {
        const { id, Like } = likedata;
        console.log(likedata)
        const { data } = await api.likevideo(id, Like);
        dispatch({ type: "POST_LIKE", payload: data })
        dispatch(getallvideo())
    } catch (error) {
        console.log(error)
    }
}


export const viewvideo=(viewdata)=>async(dispatch)=>{
    try {
        const{id}=viewdata;
        console.log(id)
        const {data}=await api.viewsvideo(id)
        dispatch({type:"POST_VIEWS",data})
        dispatch(getallvideo())
    } catch (error) {
        console.log(error)
    }
}

// ✅ New Action for Fetching Received Videos
export const getReceivedVideos = (receiverEmail) => async (dispatch) => {
    try {
        const { data } = await api.getReceivedVideos(receiverEmail);
        dispatch({ type: 'FETCH_RECEIVED_VIDEOS', payload: data });
    } catch (error) {
        console.error("❌ Error fetching received videos:", error.response?.data || error.message);
    }
};
