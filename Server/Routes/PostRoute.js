import express from 'express'
import { addComment, createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from '../Controllers/PostController.js'
const router = express.Router()

router.post('/', createPost)
router.get('/:id' ,getPost)
router.put('/:id', updatePost)
router.delete('/:id/:userId', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/comment' , addComment)

export default router