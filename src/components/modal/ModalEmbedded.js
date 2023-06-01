import React from 'react'
import {Button, Modal} from 'react-bootstrap'

const ModalEmbedded = ({
    type='',
    show=false,
    setShow=()=>{},
    onChange=()=>{},
    onSubmit=()=>{},
    data={}
}) => {
  return (
    <Modal show={show} size='xl'>
        <Modal.Header>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                    <h3 className="card-label fw-bold">{type} Embedded</h3>
                    <span className="form-text text-muted">
                        Form Input Embedded
                    </span>
                </div>
            </div>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div className='mb-3'>
                    <label htmlFor='embeddedName' className='form-label'>Embedded Name</label>
                    <input type='text' className='form-control' id='embeddedName' name='embeddedName' value={data.embeddedName} onChange={(e)=>onChange(e, 'embedded')} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='embeddedDepartement' className='form-label'>Departement</label>
                    <select class="form-select" aria-label="Default select example" id='embeddedDepartement' value={data.embeddedDepartement} name='embeddedDepartement' onChange={(e)=>onChange(e, 'embedded')}>
                        <option selected></option>
                        <option value="1">One</option>
                        <option value="2">Two</option> onChange
                        <option value="3">Three</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor='embeddedDescription' className='form-label'>Description</label>
                    <textarea id='embeddedDescription' className='form-control' placeholder='Example : This Embedded About Marketing ...' value={data.embeddedDescription} name='embeddedDescription' onChange={(e)=>onChange(e, 'embedded')}></textarea>
                </div>
                <div className='mb-3'>
                    <label htmlFor='embeddedUrl' className='form-label'>URL</label>
                    <textarea id='embeddedUrl' className='form-control' placeholder='Example : https://app.powerbi.com/view?r=eyJrIjoiNTY1MzI2OTA' value={data.embeddedUrl} name='embeddedUrl' onChange={(e)=>onChange(e, 'embedded')}></textarea>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className='text-end'>
                <Button className='btn btn-secondary me-3' onClick={()=>setShow('close')}>Close</Button>
                <Button className='btn btn-primary' onClick={()=>onSubmit(type)}>Save</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalEmbedded