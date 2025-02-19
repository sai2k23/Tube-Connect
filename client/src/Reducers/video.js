

const videoreducer=(state={data:null, receivedVideos: []},action)=>{
    switch (action.type) {
        case 'POST_VIDEO':
            return {...state};
        case 'POST_LIKE':
            return {...state};
        case 'POST_VIEWS':
            return {...state};
        case 'FETCH_ALL_VIDEOS':
            return {...state,data:action.payload};
            case 'FETCH_RECEIVED_VIDEOS': // ✅ Updated to store received videos separately
            return { ...state, receivedVideos: action.payload || [] };
        default:
            return state;
    }
}
export default videoreducer