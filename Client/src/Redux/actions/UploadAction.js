import * as UploadApi from '../../Api/UploadRequest.js'

export const uploadImage = (data)=> async(dispatch)=> {
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        console.log(error);
    }
}

export const uploadPost = (data) => async(dispatch)=> {
        dispatch({type: "UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type: "UPLOAD_SUCCESS", data:newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type: "UPLOAD_FAILED"})
    }
}

export const addComment =  (data) => async(dispatch)=>{
    dispatch({type:"ADD_COMMENT_START"})
   try {
    const newComment = await UploadApi.addComment(data)
    console.log('ON ACTION UOPOAD',newComment);
    dispatch({type:"ADD_COMMENT_SUCCESS", data:newComment.data.posts})
   } catch (error) {
    dispatch({type:"ADD_COMMENT_FAILED"})
   } 

}