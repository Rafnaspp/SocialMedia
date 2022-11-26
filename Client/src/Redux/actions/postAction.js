import * as PostApi from "../../Api/PostRequest.js"

export const getTimelinePosts = (id)=> async(dispatch)=>{
    dispatch({type: "RETREIVING_START"})
    try {
        const {data} =await PostApi.getTimelinePosts(id)
        dispatch({type:"RETREIVING_SUCCESS", data:data})
    } catch (error) {
        dispatch({type:"RETREIVING_FAIL"})
        console.log(error);
    }
}

export const deletePost = (id ,userId)=> async(dispatch)=>{
    dispatch({type: "DELETE_START"})
    try {
        const {data} =await PostApi.deletePost(id ,userId)
        dispatch({type:"DELETE_SUCCESS", data:data})
    } catch (error) {
        dispatch({type:"DELETE_FAIL"})
        console.log(error);
    }
}

