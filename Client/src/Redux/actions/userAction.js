import * as UserApi from '../../Api/UserRequest.js'


export const updateUser = (id, formData) => async(dispatch)=>{
    dispatch({type:"UPDATING_START"})
    try {
        const {data} =  await UserApi.updateUser(id, formData)
        console.log('updateapi calledd',data);
        dispatch({type:"UPDATING_SUCCESS", data:data})
        console.log(data);
        console.log('aftger dispatch ssucces');
    } catch (error) {
        dispatch({type:"UPDATE_FAIL"})
    }
} 

export const followUser =(id, data)=> async(dispatch)=>{
    dispatch({type:"FOLLOW_USER"})
    UserApi.followUser(id, data)
}

export const unFollowUser =(id, data)=> async(dispatch)=>{
    dispatch({type:"UNFOLLOW_USER"})
    UserApi.unFollowUser(id, data)
}
