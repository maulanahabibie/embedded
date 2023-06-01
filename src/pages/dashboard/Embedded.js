import React, { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Button, Col, Row,} from 'react-bootstrap'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {FiExternalLink} from 'react-icons/fi'
import {GrEdit} from 'react-icons/gr'
import {FaEraser} from 'react-icons/fa'
import { Search } from '../../components'
import { MySwal } from '../../utils'
import { ModalEmbedded } from '../../components/modal'

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
    embeddedName: "",
    embeddedDepartement: "",
    embeddedDescription: "",
    embeddedUrl: "",
}
const initialModal = {
    show: false,
    type: "",
    onSubmit:()=>{}
}
const sw = new MySwal();
const Embedded = () => {
    const params = useParams()
    const navigate = useNavigate()

    const[datas, setDatas]=useState([...dataEmbedded])
    const[datasReal]=useState([...dataEmbedded])
    const[isLoading, setIsLoading]=useState(false)
    const[search,setSearch]=useState('')

    const[modalShow, setModalShow]=useState({...initialModal})
    const[dataForm, setDataForm]=useState({...initialFormEmbedded})

    const handleChange = useCallback((e, type='')=>{
        const{name, value}=e.target;
        if(type==='search'){
            if(name==='search') setSearch(value)
        }
        else if(type==='embedded'){
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
                return `${f.nameEmbedded}`.toLowerCase().includes(search.toLowerCase())
            })
            setDatas(newState)
            
        }else{
            setDatas(datasReal)
        }
        setTimeout(()=>sw.close(), 2000)
        setTimeout(()=>setIsLoading(false), 2000)
    },[search, datasReal])

    const onSubmitData = useCallback((param='')=>{
        console.log(param)
        console.log(dataForm)
    },[dataForm])

    const buttonLink = useCallback((url)=>{
        window.open(url, '_blank').focus();
    },[])
    const onBack = useCallback(()=>{
        navigate("/departement")
    },[])

    const onModalShow = useCallback((param='')=>{
        if(param==='close'){
            setModalShow({...initialModal})
        }
        else if(param==='create'){
            setModalShow((old)=>({
                ...old,
                show: true,
                type: 'Create'
            }))
        }
    },[])

    if(modalShow.show){
        return(
            <Wrapper>
                <ModalEmbedded 
                    type='Create'
                    show={modalShow.show}
                    setShow={onModalShow}
                    data={dataForm}
                    onChange={handleChange}
                    onSubmit={onSubmitData}
                />
            </Wrapper>
        )
    }

  return (
    <Wrapper>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-3">
            <div>
                <h3 className="card-label fw-bold">{params.viewType}</h3>
                <span className="form-text text-muted">
                    Data List {params.viewType}
                </span>
            </div>
            <div>
                <Button className="btn btn-danger font-weight-bold" onClick={()=>onModalShow('create')}>
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
                        return(
                            <Col md={6} key={i} className='mb-3 box-sizing' >
                            <div className='bg-danger p-2 rounded w-100' style={{height: '400px'}}>
                              <div className='row w-100'>
                                <h3 className='col-9 m-0 text-truncate text-white fw-bold'>Name Embedded</h3>
                                <div className='col-3 text-end p-0'>
                                    <Button className='me-1 btn btn-light' onClick={()=>buttonLink(d.source)}><FiExternalLink className='text-danger' /></Button>
                                    <Button className='me-1 btn btn-light' onClick={()=>buttonLink(d.source)}><GrEdit className='text-danger' /></Button>
                                    <Button className='btn btn-light' onClick={()=>buttonLink(d.source)}><FaEraser className='text-danger' /></Button>
                                </div>
                              </div>
                              <div className='row w-100 justify-item-center box-sizing align-items-center m-0 p-0' style={{height: '60px', whiteSpace: 'pre-line', lineHeight: '15px', overflow: 'hidden', textAlign: 'justify'}}>
                                  <article className='text-white col-12 m-0 h-100 p-0 '>Description About Embedds</article>
                              </div>
                              <div className='w-100' style={{height: '280px'}}>
                                <img  width='100%' height='100%' className='rounded' src={'https://reactjs.org/logo-og.png'} />
                              </div>
                            </div>
                          </Col>
                            // <Col md={6} className='mb-3' key={i}>
                            //     <div className='p-2 bg-info box-sizing rounded' style={{height: '400px'}}>
                            //         <div className='h-100 w-100'>
                            //             <div className='row w-100 justify-content-between align-items-center m-0 shadow-lg rounded bg-primary' style={{height: "60px"}}>
                            //                 <h3 className="fw-bold w-75 text-truncate m-0">
                            //                     <BiAbacus className='text-white' />
                            //                     <span className='form-text text-white  ms-4 mb-0 m-0'>{d.nameEmbedded}</span>
                            //                 </h3>
                            //                 <div className='w-25 row'>
                            //                     <Button className='btn btn-outline-info' onClick={()=>buttonLink(d.embedded)}><FiExternalLink className='text-white' /></Button>
                            //                     <small className='text-white text-end'>{d.publish}</small>
                            //                 </div>
                            //             </div>
                            //             <div className='w-100 box-sizing p-2 rounded' style={{height: "320px"}}>
                            //                 <iframe className='rounded' title="Report Section" width="100%" height="100%" src={d.embedded} frameBorder="0" allowFullScreen={true}></iframe>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </Col>
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