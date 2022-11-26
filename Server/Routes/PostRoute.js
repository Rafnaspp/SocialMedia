import express from 'express'
import { addComment, createPost, deletePost, getPosts, getPost, getTimelinePosts, likePost, updatePost } from '../Controllers/PostController.js'
const router = express.Router()

router.get("/allpost",getPosts)
router.post('/', createPost)
router.get('/:id' ,getPost)
router.put('/:id', updatePost)
router.delete('/:id/:userId', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)
router.post('/comment' , addComment)
// router.get('/allPosts', getAllPosts)

export default router