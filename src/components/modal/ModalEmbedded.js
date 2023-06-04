import React from 'react'
import {Button, Modal} from 'react-bootstrap'
import { FaElementor, FaHubspot } from 'react-icons/fa'

const ModalEmbedded = ({
    type='',
    show=false,
    setShow=()=>{},
    onChange=()=>{},
    onSubmit=()=>{},
    data={},
    departementName=[]
}) => {
  return (
    <Modal show={show} size='xl'>
        <Modal.Header>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <button type='button' className='toggle-btn btn text-danger' >
                    <div className=''>
                        <h3 className='logo-text fw-bold'>{type} Embedded <FaHubspot /></h3>
                        <span className="form-text text-muted">
                            Form Input Embedded
                        </span>
                    </div>                  
                </button>
                {/* <div>
                    <h3 className="card-label fw-bold">{type} Embedded</h3>
                    <span className="form-text text-muted">
                        Form Input Embedded
                    </span>
                </div> */}
            </div>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Embedded Name</label>
                    <input type='text' className='form-control' id='name' name='name' value={data.name} onChange={(e)=>onChange(e, 'embedded')} />
                </div>
                {/* <div className='mb-3'>
                    <label htmlFor='slugDepartement' className='form-label'>Embedded Name</label>
                    <input type='text' className='form-control' id='slugDepartement' name='slugDepartement' value={data.slugDepartement} onChange={(e)=>onChange(e, 'embedded')} disabled={true}/>
                </div> */}
                <div className='mb-4'>
                    <label htmlFor='slugDepartement' className='form-label'>Departement</label>
                    <select className="form-select" aria-label="Default select example" id='slugDepartement' value={data.slugDepartement} name='slugDepartement' onChange={(e)=>onChange(e, 'embedded')} disabled={true}>
                        {departementName.map((d,i)=>{
                            return(
                                <option key={i} value={d.value}>{d.title}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <textarea id='description' className='form-control' placeholder='Example : This Embedded About Marketing ...' value={data.description} name='description' onChange={(e)=>onChange(e, 'embedded')}></textarea>
                </div>
                <div className='mb-3'>
                    <label htmlFor='image' className='form-label'>Image Url</label>
                    <textarea id='image' className='form-control' placeholder='Example : https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTA' value={data.image} name='image' onChange={(e)=>onChange(e, 'embedded')}></textarea>
                </div>
                <div className='mb-3'>
                    <label htmlFor='source' className='form-label'>Source Url</label>
                    <textarea id='source' className='form-control' placeholder='Example : https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTA' value={data.source} name='source' onChange={(e)=>onChange(e, 'embedded')}></textarea>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className='text-end'>
                <Button className='btn btn-secondary me-3' onClick={()=>setShow('close')}>Close</Button>
                <Button className={`btn ${type==='Delete' && 'btn-danger'} ${type==='Update' && 'btn-primary'} ${type==='Create' && 'btn-success'}`} onClick={()=>onSubmit(type)}>{type}</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalEmbedded