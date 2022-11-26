import { ActionIcon } from "@mantine/core"

const postReducer = (
    state = { posts: [] , loading: false, error: false, uploading: false },
    action
) => {
    switch (action.type) {
        case "UPLOAD_START":
            return { ...state, uploading: true, error: false }
        case "UPLOAD_SUCCESS":
            console.log(action)
            return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false }
        case "UPLOAD_FAILED":
            return { ...state, uploading: false, error: true }
            
        case "RETREIVING_START":
            return { ...state, uploading: true, error: false }
        case "RETREIVING_SUCCESS":
            return { ...state, posts: action.data, uploading: false, error: false }
        case "RETREIVING_FAILED":
            return { ...state, uploading: false, error: true }

            case "DELETE_START":
                return { ...state, uploading: true, error: false }
            case "DELETE_SUCCESS":
                return { ...state, posts: state.posts.filter((post)=>post._id !==  action.data.id), uploading: false, error: false }
            case "DELETE_FAIL":
                return { ...state, uploading: false, error: true }

        case "ADD_COMMENT_START":
                return { ...state, uploading: true, error: false }
        case "ADD_COMMENT_SUCCESS":
                return { ...state,  posts : [action.data, ...state.posts.filter((post)=>post._id !==  action.data._id)], uploading: false, error: false }
        case "ADD_COMMENT_FAILED":
                return { ...state, uploading: false, error: true }

            
        default:
            return state
    }
}

export default postReducer