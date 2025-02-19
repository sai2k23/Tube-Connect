const currentuserreducer=(state=null,action)=>{
    switch (action.type) {
        case "FETCH_CURRENT_USER":
            return action.payload || null;
        default:
            return state;
    }
}
export default currentuserreducer;