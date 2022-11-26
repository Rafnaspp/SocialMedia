import React from 'react'
import AdminLand from './AdminLand'
import PostManage from '../../components/adminComponents/postManage/PostManage'


const AdminPosts = () => {
  return (
    <div>
      <AdminLand children={<PostManage/>} />
    </div>
  )
}

export default AdminPosts

