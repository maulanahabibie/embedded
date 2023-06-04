import React, { useCallback, useEffect, useState } from 'react'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Search } from '../../../components'
import {Row, Col, Button} from 'react-bootstrap'
import {FiExternalLink} from 'react-icons/fi'
import {GrEdit} from 'react-icons/gr'
import {FaEraser} from 'react-icons/fa'
import { MySwal } from '../../../utils'
import { useSelector } from 'react-redux'

const sw = new MySwal()
const dataDummy = [
  {embeddedName: 'Penjualan Ikan',  embeddedDescription: 'Penjualan sate tahun 2020', image: 'https://reactjs.org/logo-og.png', source: 'https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D'},
  {embeddedName: 'Penjualan Ayam',  embeddedDescription: 'Penjualan sate tahun 2020', image: 'https://reactjs.org/logo-og.png', source: 'https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D'},
  {embeddedName: 'Penjualan Bebek',  embeddedDescription: 'Penjualan Bebebk tahun 2020', image: 'https://reactjs.org/logo-og.png', source: 'https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D'},
  {embeddedName: 'Penjualan Sapi',   embeddedDescription: 'Penjualan Sapi tahun 2020', image: 'https://reactjs.org/logo-og.png', source: 'https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D'},
  {embeddedName: 'Penjualan Kambing', embeddedDescription: 'Penjualan Kambing tahun 2020', image: 'https://reactjs.org/logo-og.png', source: 'https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D'},
  {embeddedName: 'Penjualan Sate',  embeddedDescription: 'Penjualan Sate tahun 2020', image: 'https://reactjs.org/logo-og.png', source: 'https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D'},
  {embeddedName: 'Penjualan Opor',  embeddedDescription: 'Penjualan Opor tahun 2020', image: 'https://reactjs.org/logo-og.png', source: 'https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTAtYzgzOS00NTMxLWI2ZmEtYjNmYmQ4Nzg3MWMwIiwidCI6ImZjNzQzMDc1LTkzZWQtNGE1Yy04MmMwLWNhNWVhYzkxNDIyMCIsImMiOjEwfQ%3D%3D'},
]
const AllData = () => {
  const {user, userData}= useSelector((store) => store.user);

  const[isLoading, setIsLoading]=useState(false)
  const[datas, setDatas]=useState([])
  const[datasReal, setDatasReal]=useState([])

  const[search, setSearch]=useState('')
  const handleChange = useCallback((e, type='')=>{
    const {name, value}= e.target;
    if(type==='search'){
      setSearch(value)
    }
  },[])
  const handleSubmit = useCallback(()=>{
    sw.loading();
    setIsLoading(true)
    if(search === ''){
      setDatas(datasReal)
    }else{
      const newDate = [...datasReal]
      const filter = newDate.filter(f=>{
        return `${f.name}${f.description}`.toLowerCase().includes(search.toLowerCase())
      })
      setDatas(filter)
    }

    setTimeout(()=> sw.close(), 500)
    setTimeout(()=> setIsLoading(false), 500)
  },[datasReal, datas, search])
  const onLink = useCallback((param)=>{
    window.open(param, '_blank').focus();
  },[])
  useEffect(()=>{
    if(userData.embeddedId){
      setDatas(userData.embeddedId)
      setDatasReal(userData.embeddedId)
    }
  },[userData.embeddedId])
  
  return (
   <Wrapper>
      <div>
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
            maxHeight: "780px",
            wordBreak: 'keep-all',
            whiteSpace: 'nowrap'
        }}
      >

        <Row>
          {!isLoading 
            ? datas.length 
              ? 
                datas.map((d,i)=>{
                  return(
                    <Col md={4} className='mb-3 box-sizing' key={i}>
                      <div className='bg-danger p-2 rounded w-100' style={{height: '400px'}}>
                        <div className='row w-100'>
                          <h3 className='col-9 m-0 text-truncate text-white fw-bold'>{d.name}</h3>
                          <div className='col-3 text-end p-0'>
                            <Button className='me-1 btn btn-light' onClick={()=>onLink(d.source)}><FiExternalLink className='text-danger' /></Button>
                            {/* <Button className='me-1 btn btn-light' onClick={()=>onLink(d.source)}><GrEdit className='text-danger' /></Button>
                            <Button className='btn btn-light' onClick={()=>onLink(d.source)}><FaEraser className='text-danger' /></Button> */}
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
              : <div>Data Not Found</div>
            : <div>Loading ...</div>
          }

        </Row>
      </div>
   </Wrapper>
  )
}

export default AllData