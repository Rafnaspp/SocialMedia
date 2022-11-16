import * as AuthApi from '../../Api/AuthRequest.js'

export const logIn = (formData) => async(dispatch) => {
    dispatch({type: "AUTH_START"})
  try {
      const {data} = await AuthApi.logIn(formData)
      dispatch({type : "AUTH_SUCCESS", data: data})
  } catch (error) {
     console.log(error);    
     dispatch({type: "AUTH_FAIL"})
  }
}

export const checkUser = (formData) => async(dispatch) => {
  dispatch({type: "CHECK_START"})
try {
    const {data} = await AuthApi.checkUser(formData)
    dispatch({type : "CHECK_SUCCESS", data: data})
} catch (error) {
   console.log(error);    
   dispatch({type: "CHECK_FAIL"})
}
}

export const signUp = (formData) => async(dispatch) => {
    dispatch({type: "AUTH_START"})
  try {
      const {data} = await AuthApi.signUp(formData)
      dispatch({type : "AUTH_SUCCESS", data: data})
  } catch (error) {
     console.log(error);    
     dispatch({type: "AUTH_FAIL"})
  }
}

export const logOut = ()=> async(dispatch)=>{
  dispatch({type:"LOG_OUT"})
}