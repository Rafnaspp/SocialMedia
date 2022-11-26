export default function Validate(values){
    let errors ={}
    if(!values.firstname.trim()){
     errors.firstname="First Name is required"
 
    }
    if(!values.lastname.trim()){
     errors.lastname="Last Name is required"
 
    }
 
    if(!values.username.trim()){
        errors.username="UserName is required"
    }

    // if(!values.mobile.trim()){
    //     errors.mobile="Mobile is required"
    //    }else if(values.mobile.length < 10 ){
    //     errors.mobile="Mobile must be 10 digists"
    //    }
 
    if(!values.password.trim()){
     errors.password="Password is required"
    }else if(values.password.length < 4 ){
     errors.password="Password must be 4 characters"
    }

     if(values.confirmpass !== values.password){
     errors.confirmpass="Password is not match"
    }
    return errors;
 }