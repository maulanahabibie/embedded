import React, { useCallback, useEffect, useState } from 'react'
import {Button} from 'react-bootstrap'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import Search from '../../components/Search';
import {FiExternalLink} from 'react-icons/fi'
import {GrEdit} from 'react-icons/gr'
import {FaEraser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { ModalCategory } from '../../components';
import { formatDate, MySwal } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { createDepartement, deleteDepartement, updateDepartement } from '../../utils/moxAxios';
import { loginUserCheck } from '../../features/user/userSlice';

const initialModal = {
    show: false,
    type: "",
    onSubmit:()=>{}
}
const initialDataForm = {
    name: "",
    url: "",
    slug: "",
    id: "",
}

const dataCategories = [
    { departementRoute: "/departement/tableau",     departementPublish: "13-04-1995", departementName: "Tableau"      , slug: "CATE98723450101"},
    { departementRoute: "/departement/powerbi",     departementPublish: "13-04-1995", departementName: "Power BI"     , slug: "CATE98723450102"},
    { departementRoute: "/departement/smart-energy",departementPublish: "13-04-1995", departementName: "Smart Energy" , slug: "CATE98723450103"},
]
const sw = new MySwal()
const Category = () => {
    const {isLoading, userData}=useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[datas,setDatas]=useState([])
    const[datasReal,setDatasReal]=useState([])
    const[search,setSearch]=useState('')
    const[modal,setModal]=useState({...initialModal})
    const[dataForm, setDataForm]=useState({...initialDataForm})

    useEffect(()=>{
        if(userData.departementId){
            setDatas(userData.departementId)
            setDatasReal(userData.departementId)
          }
    },[userData.departementId])

    const handleChange = useCallback((e, type='')=>{
        const{name, value}=e.target;
        if(type==='search'){
            if(name==='search') setSearch(value)
        }
        else if(type==='category'){
            let val = value.split('');
            val = val.map(f=>['',' '].includes(f) ? '-': f ).join('')            
            setDataForm((old)=>({
                ...old,
                [name]: value,
                url: `/${val}`.toLowerCase()
            }))
        }
    },[])
    const handleSubmit = useCallback(()=>{
        sw.loading()
        if(search !== ''){
            const newState = datasReal.filter(f=>{
                return `${f.name}`.toLowerCase().includes(search.toLowerCase())
            })
            setDatas(newState)
            
        }else{
            setDatas(datasReal)
        }
        setTimeout(()=>sw.close(), 500)
    },[search, datasReal])

    const onLinkButton = useCallback((param)=>{
        navigate(param)
    },[])
    const onSubmitModal = useCallback(async(param='')=>{
        sw.loading()
        const newState = {...dataForm}
        if(param==='Create'){
            const generateId = `DEPA${formatDate(new Date(), 'time')}`
            const payload = {
                ...newState,
                slug: generateId,
                url: `/departement/${generateId}${newState.url}`,
                userId: [userData.id],
                id  : null
            }
            const res = await createDepartement(payload)
            if(res.code !== '1') return sw.warning(res.msg || "Failed");
            else{
                sw.success(res.msg || "Created")
                setModal({...initialModal})
                setDataForm({...initialDataForm})
                dispatch(loginUserCheck());
            }
        }
        else if(param==='Edit'){
            const payload = {
                id  : newState.id,
                name: newState.name,
                url : newState.url,
            }
            const res = await updateDepartement(payload);
            if(res.code !== '1') return sw.warning(res.msg || "Failed");
            else{
                sw.success(res.msg+" "+res.name || "Update")
                setModal({...initialModal})
                setDataForm({...initialDataForm})
                dispatch(loginUserCheck());
            }
        }
        else if(param==='Delete'){
            const payload = {
                id: newState.id
            }
            const res = await deleteDepartement(payload);
            if(res.code !== '1') return sw.warning(res.msg || "Failed");
            else{
                sw.success(res.msg || "Created")
                setModal({...initialModal})
                setDataForm({...initialDataForm})
                dispatch(loginUserCheck());
            }
        }
        setTimeout(()=>sw.close(), 1500)
    },[dataForm])
    const onShowModal =useCallback((param='', slug='')=>{
        if(param==='close'){
            setDataForm({...initialDataForm})
            setModal({...initialModal})

        }
        else if(param==='create'){
            setModal((old)=>({
                ...old,
                show : true,
                type : "Create",
                onSubmit: ()=>onSubmitModal('create', slug)
            }))
        }
        else if(param==='edit'){
            const find = datasReal.find(f=>f.id===slug)
            setDataForm((old)=>({
                ...old,
                name  : find.name || "",
                url   : find.url || "",
                id    : find.id || "",
            }))
            setModal((old)=>({
                ...old,
                show : true,
                type : "Edit",
                onSubmit: ()=>onSubmitModal('edit', slug)
            }))
        }
        else if(param==='delete'){
            const find = datasReal.find(f=>f.id===slug)
            setDataForm((old)=>({
                ...old,
                name  : find.name || "",
                url   : find.url  || "",
                id    : find.id   || "",
            }))
            setModal((old)=>({
                ...old,
                show : true,
                type : "Delete",
                onSubmit: ()=>onSubmitModal('delete', slug)
            }))
        }
    },[onSubmitModal, datasReal])
    if(modal.show){
        return(
            <Wrapper>
                <ModalCategory 
                    show={modal.show}
                    type={modal.type}
                    setShow={onShowModal}
                    handleSubmit={onSubmitModal}
                    handleChange={handleChange}
                    dataForm={dataForm}
                />
            </Wrapper>
        )
    }

  return (
    <Wrapper className='p-4'>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-5">
            <div>
                <h3 className="card-label fw-bold">Departements</h3>
                <span className="form-text text-muted">
                    Data List Departements
                </span>
            </div>
            <div>
                <Button onClick={()=>onShowModal('create')} className="btn btn-danger font-weight-bold">
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
 
        <div className='table-responsive '
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
            }}>
                <thead className='fw-bold table-danger '>
                    <tr className=''>
                        <td width="5%"  className='p-3'>No</td>
                        <td width="40%" className='p-3'>Departement</td>
                        <td width="20%" className='p-3'>Publish</td>
                        <td width="10%" className='p-3'>Action</td>
                    </tr>
                </thead>
                {!isLoading ? datas.length
                ?
                datas.map((d,i)=>{
                    return(
                        <tbody key={i}>
                            <tr>
                                <td width="5%"  className='p-3'>{i+1}</td>
                                <td width="20%" className='p-3'>{d.name}</td>
                                <td width="20%" className='p-3'>{formatDate(d.updatedAt, 'DD-MM-YYYY')}</td>
                                <td width="10%" className='p-3'>
                                    <div className='btn btn-outline-success me-2'><FiExternalLink onClick={()=>onLinkButton(d.url)}    /></div>
                                    <div className='btn btn-outline-primary me-2'><GrEdit onClick={()=>onShowModal('edit', d.id)}    /></div>
                                    <div className='btn btn-outline-danger'><FaEraser onClick={()=>onShowModal('delete', d.id)}      /></div>
                                </td>
                            </tr>
                        </tbody>
                    )
                })
                :
                    <tbody className='text-center'>
                        <tr><td><div>Data Not Found</div></td></tr>
                    </tbody>
                :
                    <tbody className='text-center'>
                        <tr><td><div>Loading ...</div></td></tr>
                    </tbody>
                }

            </table>
        </div>
    </Wrapper>
  )
}

export default Category