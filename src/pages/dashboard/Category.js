import React, { useCallback, useState } from 'react'
import {Button} from 'react-bootstrap'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import Search from '../../components/Search';
import {FiExternalLink} from 'react-icons/fi'
import {GrEdit} from 'react-icons/gr'
import {FaEraser} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { ModalCategory } from '../../components';
import { formatDate, MySwal } from '../../utils';

const initialModal = {
    show: false,
    type: "",
    onSubmit:()=>{}
}
const initialDataForm = {
    departementName: "",
    departementRoute: "",
    departementPublish: "",
    slug: "",
}

const dataCategories = [
    { departementRoute: "/departement/tableau",     departementPublish: "13-04-1995", departementName: "Tableau"      , slug: "CATE98723450101"},
    { departementRoute: "/departement/powerbi",     departementPublish: "13-04-1995", departementName: "Power BI"     , slug: "CATE98723450102"},
    { departementRoute: "/departement/smart-energy",departementPublish: "13-04-1995", departementName: "Smart Energy" , slug: "CATE98723450103"},
]
const sw = new MySwal()
const Category = () => {
    const navigate = useNavigate()

    const[datas,setDatas]=useState([...dataCategories])
    const[datasReal,setDatasReal]=useState([...dataCategories])
    const[search,setSearch]=useState('')
    const[isloading, setIsLoading]=useState(false)
    const[modal,setModal]=useState({...initialModal})
    const[dataForm, setDataForm]=useState({...initialDataForm})

    const handleChange = useCallback((e, type='')=>{
        const{name, value}=e.target;
        if(type==='search'){
            if(name==='search') setSearch(value)
        }
        else if(type==='category'){
            setDataForm((old)=>({
                ...old,
                [name]: value
            }))
        }
    },[])
    const handleSubmit = useCallback(()=>{
        sw.loading()
        setIsLoading(true)
        if(search !== ''){
            const newState = datasReal.filter(f=>{
                return `${f.departementName}`.toLowerCase().includes(search.toLowerCase())
            })
            setDatas(newState)
            
        }else{
            setDatas(datasReal)
        }
        setTimeout(()=>sw.close(), 2000)
        setTimeout(()=>setIsLoading(false), 2000)
    },[search, datasReal])

    const onLinkButton = useCallback((param)=>{
        navigate(param)
    },[])
    const onSubmitModal = useCallback((param='')=>{
        sw.loading()
        setIsLoading(true)
        const newState = {...dataForm}
        if(param==='Create'){
            const payload = {
                ...newState,
                slug: `CATE${formatDate(new Date(), 'time')}`
            }
            setModal({...initialModal})
            setDataForm({...initialDataForm})
            const newArr = [...datasReal].concat([payload])
            setDatasReal(newArr)
            setDatas(newArr)
        }
        else if(param==='Edit'){
            setModal({...initialModal})
            setDataForm({...initialDataForm})
        }
        else if(param==='Delete'){
            setModal({...initialModal})
            setDataForm({...initialDataForm})

        }
        setTimeout(()=>sw.close(), 2000)
        setTimeout(()=>setIsLoading(false), 2000)
    },[dataForm])
    const onShowModal =useCallback((param='', slug='')=>{
        if(param==='close'){
            sw.loading()
            setIsLoading(true)
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
            const find = datasReal.find(f=>f.slug===slug)
            setDataForm((old)=>({
                ...old,
                departementName  : find.departementName || "",
                departementRoute : find.departementRoute || "",
                departementPublish  : find.departementPublish || "",
            }))
            setModal((old)=>({
                ...old,
                show : true,
                type : "Edit",
                onSubmit: ()=>onSubmitModal('edit', slug)
            }))
        }
        else if(param==='delete'){
            const find = datasReal.find(f=>f.slug===slug)
            setDataForm((old)=>({
                ...old,
                departementName  : find.departementName || "",
                departementRoute : find.departementRoute || "",
                departementPublish  : find.departementPublish || "",
            }))
            setModal((old)=>({
                ...old,
                show : true,
                type : "Delete",
                onSubmit: ()=>onSubmitModal('delete', slug)
            }))
        }
        setTimeout(()=>sw.close(), 2000)
        setTimeout(()=>setIsLoading(false), 2000)
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
                {!isloading ? datas.length
                ?
                datas.map((d,i)=>{
                    return(
                        <tbody key={i}>
                            <tr>
                                <td width="5%"  className='p-3'>{i+1}</td>
                                <td width="20%" className='p-3'>{d.departementName}</td>
                                <td width="20%" className='p-3'>{d.departementPublish}</td>
                                <td width="10%" className='p-3'>
                                    <div className='btn btn-outline-success me-2'><FiExternalLink onClick={()=>onLinkButton(d.departementRoute)}          /></div>
                                    <div className='btn btn-outline-primary me-2'><GrEdit onClick={()=>onShowModal('edit', d.slug)}                    /></div>
                                    <div className='btn btn-outline-danger'><FaEraser onClick={()=>onShowModal('delete', d.slug)}                      /></div>
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