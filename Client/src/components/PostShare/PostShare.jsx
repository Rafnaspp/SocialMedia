import React,{useState,useRef} from 'react'
import Profile from '../../img/Profile.jpeg'
import './PostShare.scss'
import {UilScenery} from "@iconscout/react-unicons"
import {UilPlayCircle} from "@iconscout/react-unicons"
import {UilLocationPoint} from "@iconscout/react-unicons"
import {UilSchedule} from "@iconscout/react-unicons"
import {UilTimes} from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../Redux/actions/UploadAction.js'


const PostShare = () => {
   const loading = useSelector((state)=>state.postReducer.uploading)
   const [image, setImage] = useState(null)
   const imageRef = useRef()  
   const dispatch = useDispatch()
   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
   const desc = useRef()
   const {user} = useSelector((state)=>state.authReducer.authData)

   const onImageChange = (event)=>{
    if(event.target.files && event.target.files[0]){
        let img = event.target.files[0]
        setImage(img)
    }
   }
   const reset =()=>{
    setImage(null)
    desc.current.value =""
   }
   const handleSubmit = (e)=>{
      e.preventDefault();

      const newPost = {
        userId : user._id,
        desc : desc.current.value
      }

      if(image){
        const data = new FormData()
        const filename = Date.now() + image.name
        data.append("name", filename)
        data.append("file", image)
        newPost.image = filename
        try {
            dispatch(uploadImage(data))
        } catch (error) {
            console.log(error);
        }
      }
      dispatch(uploadPost(newPost))
      reset()
   }

  return (
     <div className="PostShare">
        <img src={user.profilePicture? serverPublic + user.profilePicture :Profile} alt="" />
        <div>
            <textarea name="" id="" cols="3" rows="2" ref = {desc}
            required  placeholder='whats happening'>
            </textarea>
            
        <div className='PostOptions'>
        <div className="options" style={{color:"var(--photo)"}}
        onClick={()=>imageRef.current.click()}
        >
           <UilScenery />
           Photo
           </div>
        
        <button className='button ps-button'
        onClick={handleSubmit}
        disabled={loading}
        >
            {loading? "Uploading..." : "Share"}
        </button>
        <div style={{display:"none"}}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
        </div>
        </div>
        {image && (
            <div className="previewImage">
                 <UilTimes onClick={()=>setImage(null)} />
                 <img src={ URL.createObjectURL(image)} alt="" />
            </div>
        )}
        </div>
     </div>
  )
}

export default PostShare
