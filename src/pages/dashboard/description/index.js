import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaHubspot } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Wrapper from '../../../assets/wrappers/DashboardFormPage';
import { MySwal } from '../../../utils';
import { listEmbeddeds } from '../../../utils/moxAxios';

const sw = new MySwal();
const Description = () => {
    const {userData} = useSelector((state)=>state.user)
    const param = useParams();
    const navigate = useNavigate()
    const location = useLocation();
    const[source, setSource]=useState(null)
    // const getData = useCallback(async()=>{
    //     sw.loading();
    //     const data = await listEmbeddeds(param)
    // },[])
    useEffect(()=>{
        if(userData && userData.embeddedId && param.id){
            const find = userData.embeddedId && userData.embeddedId.find(f=>f.id===Number(param.id))
            setSource(find)
        }
    },[userData, userData.embeddedId, param.id])
    const onBack = useCallback(()=>{
        if(location.pathname.split('/')[1] === 'alldata') navigate('/alldata')
        else navigate(`/departement/${param.slug}/${param.viewType}`)
        
    },[navigate, location])
  return (
    <Wrapper>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-3">
            <button type='button' className='toggle-btn btn text-danger' >
                <div className=''>
                    <h3 className='logo-text fw-bold'> {source?.name && source.name} <FaHubspot /></h3>
                </div>                  
            </button>
            <div>
                <Button className={`btn btn-danger font-weight-bold`} onClick={()=>onBack()} >
                    Back
                </Button>
            </div>
        </div>
        {source?.description &&
            <div className='p-2 bg-light'>
                <h3 className=' fw-bold fs-5 m-0'> Description</h3>
                <article className=' m-0 h-100 p-0 '>{source.description}</article>
            </div>
        }
        <hr style={{height: "10px"}}/>
        {source 
            ?
            <div>
                <div style={{height: '100vh', width: '100%'}}>
                    <iframe title="Report Section" 
                        width="100%" height="100%" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D"
                    ></iframe>
                </div>
            </div>
            :
            <div>Loading ...</div>
        }
    </Wrapper>
  )
}

export default Description