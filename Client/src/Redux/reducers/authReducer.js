const authReducer = (
    state = {authData: null, authAdmin:null, loading : false , error: false},
    action 
)=> {

    switch(action.type){
        case  "AUTH_START" :
            return{...state, loading:true, error:false}
        case "AUTH_SUCCESS" :
            localStorage.setItem("profile", JSON.stringify({...action.data}))  
            return {...state, authData: action.data, loading:false}  
        case "AUTH_FAIL" :
            return {...state, loading:false, error: true}
            
            case  "ADMIN_START" :
                return{...state, loading:true, error:false}
            case "ADMIN_SUCCESS" : 
                return {...state, authAdmin: action.data, loading:false}  
            case "ADMIN_FAIL" :
                return {...state, loading:false, error: true}      

        case  "CHECK_START" :
            return{...state, loading:true, error:false}
        case "CHECK_SUCCESS" :
            // localStorage.setItem("profile", JSON.stringify({...action.data}))  
            return {...state, check: action.data, loading:false}  
        case "CHECK_FAIL" :
            return {...state, loading:false, error: true}  
        
        case "UPDATING_START" :
            return {...state, updateLoading:true , error: false}
        case "UPDATING_SUCCESS" :
            localStorage.setItem("profile", JSON.stringify({...action?.data}))
             return {...state, authData:action.data, updateLoading:false, error:true}         
        case "UPDATE_FAIL" :
              return {...state, updateLoading:false, error:true}

        case "LOG_OUT" :
            localStorage.clear()
              return {...state, authData:null , loading:false , error: false} 
              
        case "ADMIN_LOGOUT" :
         localStorage.clear()
         return {...state,  authAdmin:null , loading:false , error: false}       
        
        case "FOLLOW_USER":
              return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following, action.data]} }}
    
        case "UNFOLLOW_USER":
               return {...state, authData: {...state.authData, user: {...state.authData.user, following: [...state.authData.user.following.filter((personId)=>personId!==action.data)]} }}    
            
        default:
            return state    
    }
}

export default authReducer