import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import FormRow from '../FormRow'

const ModalCategory = ({
    show="",
    type="",
    setShow=()=>{},
    dataForm={},
    handleChange=()=>{},
    handleSubmit=()=>{}
}) => {
  return (
    <Modal show={show} size="xl">
        <Modal.Header>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                    <h3 className="card-label fw-bold">{type} Departements</h3>
                    <span className="form-text text-muted">
                        Form Input Departements
                    </span>
                </div>
            </div>
        </Modal.Header>
        <Modal.Body>
        <div className='form-center'>
          <FormRow
            type='text'
            labelText='name departement'
            name='departementName'
            value={dataForm.departementName}
            handleChange={(e)=>handleChange(e, 'category')}
            disabled={['Delete'].includes(type)}
          />
          <FormRow
            type='text'
            labelText='Route departement'
            name='departementRoute'
            value={dataForm.departementRoute}
            handleChange={(e)=>handleChange(e, 'category')}
            disabled={['Delete'].includes(type)}
          />
        </div>
        </Modal.Body>
        <Modal.Footer>
            <div className='text-end'>
                <Button className='btn btn-secondary me-3' onClick={()=>setShow('close')}>Back</Button>
                <Button className={`btn ${type==='Delete' && 'btn-danger'} ${type==='Update' && 'btn-primary'} ${type==='Create' && 'btn-success'}`} onClick={()=>handleSubmit(type)}>
                    {type}
                </Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalCategory