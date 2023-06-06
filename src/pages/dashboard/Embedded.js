import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {Button, Col, Row,} from 'react-bootstrap'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {FiExternalLink} from 'react-icons/fi'
import {GrEdit} from 'react-icons/gr'
import {FaElementor, FaEraser, FaHubspot} from 'react-icons/fa'
import { Search } from '../../components'
import { formatDate, MySwal } from '../../utils'
import { ModalEmbedded } from '../../components/modal'
import { useDispatch, useSelector } from 'react-redux'
import { createEmbedded, deleteEmbedded, updateEmbedded } from '../../utils/moxAxios'
import { loginUserCheck } from '../../features/user/userSlice'
import { generateIds, roleCms } from '../../config/role'

const dataEmbedded =[
    {nameEmbedded : 'Penjualan Kartu Simpati', category: 'TABLEAU', userName: 'comang', embedded: "https://app.powerbi.com/view?r=eyJrIjoiMjZmZDQyZTgtNzcxNS00M2RkLWIxY2YtNTc3Mjk1ZDA5NzZmIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D", publish: "13-04-1995"},
    {nameEmbedded : 'Penjualan Kartu XL', category: 'TABLEAU', userName: 'comang', embedded: "https://app.powerbi.com/view?r=eyJrIjoiMjZmZDQyZTgtNzcxNS00M2RkLWIxY2YtNTc3Mjk1ZDA5NzZmIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D", publish: "13-04-1995"},
    {nameEmbedded : 'Penjualan Kartu AS', category: 'TABLEAU', userName: 'comang', embedded: "https://app.powerbi.com/view?r=eyJrIjoiMjZmZDQyZTgtNzcxNS00M2RkLWIxY2YtNTc3Mjk1ZDA5NzZmIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D", publish: "13-04-1995"},
    {nameEmbedded : 'Penjualan Kartu ByU', category: 'TABLEAU', userName: 'comang', embedded: "https://app.powerbi.com/view?r=eyJrIjoiMjZmZDQyZTgtNzcxNS00M2RkLWIxY2YtNTc3Mjk1ZDA5NzZmIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D", publish: "13-04-1995"},
    {nameEmbedded : 'Penjualan Kartu Im3', category: 'TABLEAU', userName: 'comang', embedded: "https://app.powerbi.com/view?r=eyJrIjoiMjZmZDQyZTgtNzcxNS00M2RkLWIxY2YtNTc3Mjk1ZDA5NzZmIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D", publish: "13-04-1995"},
    {nameEmbedded : 'Penjualan Kartu 3', category: 'TABLEAU', userName: 'comang', embedded: "https://app.powerbi.com/view?r=eyJrIjoiMjZmZDQyZTgtNzcxNS00M2RkLWIxY2YtNTc3Mjk1ZDA5NzZmIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D", publish: "13-04-1995"},
    {nameEmbedded : 'Penjualan Kartu Hallo', category: 'TABLEAU', userName: 'comang', embedded: "https://app.powerbi.com/view?r=eyJrIjoiMjZmZDQyZTgtNzcxNS00M2RkLWIxY2YtNTc3Mjk1ZDA5NzZmIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D", publish: "13-04-1995"},
]
const initialFormEmbedded = {
    name: "",
    slug: "",
    image: "",
    source: "",
    departementId: "",
    userId: "",
    slugDepartement: "",
    description: "",
    id: ""
}
const initialModal = {
    show: false,
    type: "",
    onSubmit:()=>{}
}
const sw = new MySwal();
const Embedded = () => {
    const {isLoading, userData, role}=useSelector((state)=>state.user)
    const {slug, viewType} = useParams()
    const location = useLocation()
    console.log(location)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[roles]=useState(roleCms(role))
    const[departementName, setDepartementName]=useState([])

    const[datas, setDatas]=useState([])
    const[datasReal, setDatasReal]=useState([])
    const[search,setSearch]=useState('')

    const[modalShow, setModalShow]=useState({...initialModal})
    const[dataForm, setDataForm]=useState({...initialFormEmbedded})
    useEffect(()=>{
        if(userData.embeddedId){
            const filterData = userData.embeddedId.length && userData.embeddedId.filter(f=>f.slugDepartement===slug)
            const departement = userData.departementId.length && userData.departementId.find(f=>slug.includes(f.slug))
            setDatas(filterData)
            setDatasReal(filterData)
            setDepartementName([{title: departement.name, value: departement.slug}])
            setDataForm((old)=>({
                ...old,
                slugDepartement: departement.slug || "",
                userId         : userData.id || "",
                departementId  : departement.id || ""
            }))
        }
    },[userData.embeddedId, slug])

    const handleChange = useCallback((e, type='')=>{
        const{name, value}=e.target;
        if(type==='search'){
            if(name==='search') setSearch(value)
        }
        else if(type==='embedded') setDataForm((old)=>({...old, [name]: value}))
    },[])
    const handleSubmit = useCallback(()=>{
        sw.loading()
        if(search !== ''){
            const newState = datasReal.filter(f=>{
                return `${f.name}`.toLowerCase().includes(search.toLowerCase())
            })
            setDatas(newState)    
        }
        else setDatas(datasReal)
        setTimeout(()=>sw.close(), 2000)
    },[search, datasReal])

    const onSubmitData = useCallback(async(param='')=>{
        sw.loading()
        const newState = {...dataForm}
        const generateSlug = generateIds('EMBEDDED');
        if(param==='Create'){
            const payload = {
                ...newState,
                slug : `EMBE${generateSlug}`,
                id: null,
            }
            const res = await createEmbedded(payload)
            if(res.code !== '1') return sw.warning(res.msg || "Failed");
            else{
                sw.success(res.msg || "Created")
                setModalShow({...initialModal})
                setDataForm({...initialFormEmbedded})
                dispatch(loginUserCheck());
            }
        }
        else if(param==='Edit'){
            const payload = {
                id          : newState.id,
                name        : newState.name || "",
                source      : newState.source || "",
                image       : newState.image || "",
                description : newState.description || "",
            }
            const res = await updateEmbedded(payload);
            if(!res) return sw.warning('Failed')
            if(res.code !== '1') return sw.warning(res.msg || "Failed");
            else{
                sw.success(res.msg || "Update")
                setModalShow({...initialModal})
                setDataForm({...initialFormEmbedded})
                dispatch(loginUserCheck());
            }
        }
        else if(param==='Delete'){
            const payload = {
                id          : newState.id,
            }
            const res = await deleteEmbedded(payload);
            if(!res) return sw.warning('Failed')
            if(res.code !== '1') return sw.warning(res.msg || "Failed");
            else{
                sw.success(res.msg || "Update")
                setModalShow({...initialModal})
                setDataForm({...initialFormEmbedded})
                dispatch(loginUserCheck());
            }
        }
        setTimeout(()=> sw.close(), 1500)
    },[dataForm, generateIds])

    const buttonLink = useCallback((url, id='')=>{
        navigate(`/${url}/${id}`)
        // window.open(url, '_blank').focus();
    },[])
    const onBack = useCallback(()=>{
        navigate("/departement")
    },[])

    const onModalShow = useCallback((param='', slug='')=>{
        if(param==='close'){
            setDataForm({...initialFormEmbedded})
            setModalShow({...initialModal})
        }
        else if(param==='create'){
            setModalShow((old)=>({
                ...old,
                show: true,
                type: 'Create',
            }))
        }
        else if(param==='edit'){
            const finds = datasReal.find(f=>f.id===slug);
            setDataForm((old)=>({
                ...old,
                name        : finds.name || "",
                source      : finds.source  || "",
                id          : finds.id   || "",
                slug        : finds.slug || "",
                image       : finds.image || "",
                description : finds.description || "",
            }))
            setModalShow((old)=>({
                ...old,
                show: true,
                type: 'Edit',
                
            }))
        }
        else if(param==='delete'){
            const finds = datasReal.find(f=>f.id===slug);
            setDataForm((old)=>({
                ...old,
                name        : finds.name || "",
                source      : finds.source  || "",
                id          : finds.id   || "",
                slug        : finds.slug || "",
                image       : finds.image || "",
                description : finds.description || "",
            }))
            setModalShow((old)=>({
                ...old,
                show: true,
                type: 'Delete',
                
            }))

        }
    },[datasReal, onSubmitData])

    if(modalShow.show){
        return(
            <Wrapper>
                <ModalEmbedded 
                    type={modalShow.type}
                    show={modalShow.show}
                    setShow={onModalShow}
                    data={dataForm}
                    onChange={handleChange}
                    onSubmit={onSubmitData}
                    departementName={departementName}
                />
            </Wrapper>
        )
    }

  return (
    <Wrapper>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-3">
            <button type='button' className='toggle-btn btn text-danger' >
                <div className=''>
                    <h3 className='logo-text fw-bold'>{viewType} <FaHubspot /></h3>
                    <span className="form-text text-muted">
                        Data List {viewType}
                    </span>
                </div>                  
            </button>
            {/* <div>
                <h3 className="card-label fw-bold">{viewType}</h3>
                <span className="form-text text-muted">
                    Data List {viewType}
                </span>
            </div> */}
            <div>
                <Button className={`btn btn-danger font-weight-bold ${roles.crud?'':'d-none'}`} onClick={()=>onModalShow('create')}>
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
        <hr style={{height: "10px"}}/>
        <div   
            className='mb-2'     
            style={{
                overflowX: 'scroll',
                maxHeight: "680px",
                wordBreak: 'keep-all',
                whiteSpace: 'nowrap'
            }}
        >
            <Row>
                {!isLoading ? datas.length
                    ?
                    datas.map((d,i)=>{
                        console.log(d)
                        return(
                            <Col md={6} key={i} className='mb-3 box-sizing' >
                            <div className='bg-danger p-2 rounded w-100' style={{height: '400px'}}>
                              <div className='row w-100'>
                                <h3 className='col-9 m-0 text-truncate text-white fw-bold'>{d.name}</h3>
                                <div className='col-3 text-end p-0'>
                                    <Link className='me-1 btn btn-light' to={`${location.pathname}/${d.id}`} ><FiExternalLink className='text-danger' /></Link>
                                    <Button className={`me-1 btn btn-light ${roles.crud?'':'d-none'}`} onClick={()=>onModalShow('edit',d.id)}><GrEdit className='text-danger' /></Button>
                                    <Button className={`btn btn-light      ${roles.crud?'':'d-none'}`} onClick={()=>onModalShow('delete',d.id)}><FaEraser className='text-danger' /></Button>
                                </div>
                              </div>
                              <div className='row w-100 justify-item-center box-sizing align-items-center m-0 p-0' style={{height: '60px', whiteSpace: 'pre-line', lineHeight: '15px', overflow: 'hidden', textAlign: 'justify'}}>
                                  <article className='text-white col-12 m-0 h-100 p-0 '>{d.description}</article>
                              </div>
                              <div className='w-100' style={{height: '280px'}}>
                                <img  width='100%' height='100%' className='rounded' src={d.image} />
                              </div>
                            </div>
                          </Col>
                        )
                    })
                    :
                    <div>Data not found....</div>
                    :
                    <div>Loading....</div>
                }

            </Row>
        </div>
        <div className=' w-100 d-block text-end p-0'>
            <Button className='btn btn-danger' onClick={()=>onBack()}>Back</Button>
        </div>
    </Wrapper>
  )
}

export default Embedded