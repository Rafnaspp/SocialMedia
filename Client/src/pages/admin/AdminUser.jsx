import React from 'react'
import AdminLand from './AdminLand'
import UserManage from '../../components/adminComponents/main/UserManage'


const AdminUser = () => {
  return (
    <div>
      <AdminLand children={<UserManage />} />
    </div>
  )
}

export default AdminUser