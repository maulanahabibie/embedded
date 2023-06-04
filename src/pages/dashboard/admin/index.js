import React, { useCallback, useEffect, useState } from 'react'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import {Button} from'react-bootstrap'
import { Search } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate, MySwal } from '../../../utils'
import { roleCms } from '../../../config/role'
import {GrEdit} from 'react-icons/gr'
import { FaEraser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteUserForm } from '../../../utils/moxAxios'
import { loginUserCheck } from '../../../features/user/userSlice'
import { MdAdminPanelSettings } from 'react-icons/md'

const sw = new MySwal()
const Admin = () => {
    const {isLoading, userList, role}=useSelector((state)=>state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[loading, setLoading]=useState(false)
    const[datas,setDatas]=useState([])
    const[datasReal,setDatasReal]=useState([])
    const[roles]=useState(roleCms(role))

    const[search, setSearch]=useState('')
    const handleChange = useCallback((e, type='')=>{
        const{name,value}=e.target;
        if(type==='search') setSearch(value);
    },[])
    const handleSubmit = useCallback(()=>{
        sw.loading();
        setLoading(true)
        const newState= [...datasReal]
        const filters = newState.filter((f)=>{
            return `${f.username}${f.email}${f.code}`.toLowerCase().includes(search.toLowerCase())
        })
        setDatas(filters)
        setTimeout(()=>sw.close(), 1000)
        setTimeout(()=>setLoading(false), 1000)
    },[datasReal, search])
    useEffect(()=>{
        if(!isLoading && userList){
            setDatas(userList)
            setDatasReal(userList)
        }
    },[isLoading, userList])
    const onShowModal = useCallback((roleParam, userParam, param)=>{
        if(roleParam === 'ADMIN') return sw.warning('Cannot Delete User Admin');
        sw.confirm(`Are u sure to delete user ${userParam}`)
        .then(async(res)=>{
            if(res.isConfirmed){
                const response = await deleteUserForm(param);
                if(!res) return sw.warning('Something when wrong')
                if(response.code !== "1") return sw.warning(res.msg || 'Failed')
                else{
                    dispatch(loginUserCheck())
                    sw.success(res.msg || 'Succes')
                }
            }
        })
    },[dispatch])

    const onNavigateValid = useCallback((roleParam, idParam)=>{
        if(roleParam === 'ADMIN') return sw.warning('Cannot Edit User Admin');
        else navigate(`/admin/edit/${idParam}`)
    },[])
  return (
    <Wrapper>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-5">
            <button type='button' className='toggle-btn btn text-danger' >
                <div className=''>
                    <h3 className='logo-text fw-bold'>List User <MdAdminPanelSettings /></h3>
                    <span className="form-text text-muted">
                        Data List User
                    </span>
                </div>                  
            </button>
            {/* <div>
                <h3 className="card-label fw-bold">List User</h3>
                <span className="form-text text-muted">
                    Data List User
                </span>
            </div> */}
            <div>
                <Button onClick={()=> navigate('/admin/create')} className="btn btn-danger font-weight-bold">
                    Create New
                </Button>
            </div>
        </div>
        <div className='mb-2'>
            <Search 
                search={search}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
        <hr style={{height: "36px"}}/>
        <div className='table-responsive'
        style={{
           overflowX: 'scroll',
           maxHeight: "600px",
           wordBreak: 'keep-all',
           whiteSpace: 'nowrap'
        }}>
            <table className='table text-center'
                style={{
                    letterSpacing: "0px",
                    fontFamily: "normal normal medium 15px/23px Poppins",
                    display: 'block !important',
                }}
            >
                <thead className='p-3 table-danger fw-bold'>
                    <tr>
                        <td width='5%' className='p-3' >No</td>
                        <td width='20%'className='p-3' >Nama User</td>
                        <td width='30%'className='p-3' >Email</td>
                        <td width='10%'className='p-3' >Role</td>
                        <td width='10%'className='p-3' >Publish</td>
                        <td width='10%'className='p-3' >Action</td>
                    </tr>
                </thead>
                    { !isLoading && !loading
                        ? datas.length 
                            ? datas.map((d,i)=>{
                                    return(
                                        <tbody key={i}>
                                            <tr>
                                                <td width='5%'  className='p-3'>{i+1}</td>
                                                <td width='20%' className='p-3'>{d.username}</td>
                                                <td width='30%' className='p-3'>{d.email}</td>
                                                <td width='10%' className='p-3'>{d.code}</td>
                                                <td width='10%' className='p-3'>{formatDate(d.updatedAt, 'DD-MM-YYYY')}</td>
                                                <td width='10%' className='p-3'>
                                                    {/* <div className='btn btn-outline-success me-2'><FiExternalLink onClick={()=>onLinkButton(d.url)}    /></div> */}
                                                    <div className={`btn btn-outline-primary me-2 ${roles.crud ? '' : 'd-none'}`}><GrEdit onClick={()=>onNavigateValid(d.code, d.id)}    /></div>
                                                    <div className={`btn btn-outline-danger       ${roles.crud ? '' : 'd-none'}`}><FaEraser onClick={()=>onShowModal(d.code, d.username, d.id)}/></div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                }) 
                            :  <tbody className='text-center'>
                                    <tr><td><div>Data Not Found</div></td></tr>
                                </tbody>
                        :   <tbody className='text-center'>
                                <tr><td><div>Loading ...</div></td></tr>
                            </tbody>
                    }
            </table>

        </div>
    </Wrapper>
  )
}

export default Admin