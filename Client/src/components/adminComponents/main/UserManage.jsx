import React, { useEffect,useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllUser } from '../../../Api/UserRequest'
import './User.scss'
import { userBlock, userUnblock } from '../../../Api/AuthRequest';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

const UserManage = () => {
   
    const [persons, setPersons] = useState([])
    const [blocks,setBlock] = useState(false)


      const unBlock =((userId)=>{
        setBlock((prev) => !prev)
        console.log(blocks,'unblock');
        let data={
            userId:userId
        }
         userUnblock(data)
      })

      const block =((userId)=>{
        setBlock((prev) => !prev)
        console.log(blocks,'block');
         let data={
            userId:userId
        }
        userBlock(data)
     })

    useEffect(()=>{
        const fetchPersons = async()=>{
           const {data} = await getAllUser()
           setPersons(data)
           console.log(data,'usersssss');
        }
        fetchPersons()
    },[(blocks)])

  return (
    <div className='table'  >
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell ><h2>UserName</h2></TableCell>
            <TableCell ><h2>Country</h2></TableCell>
            <TableCell ><h2>Status</h2></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {persons.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
               <h3> {row.username}</h3>
              </TableCell>
              <TableCell >{row.country}</TableCell>
              {row.block ?   <TableCell >blocked</TableCell>:  <TableCell >Running</TableCell> }
              {row.block ?   <button className='button' onClick={()=>unBlock(row._id)} >Unblock</button>: <button  onClick={()=>block(row._id)} className='button' >Block</button>}
              
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default UserManage
