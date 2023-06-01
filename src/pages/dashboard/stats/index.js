import React from 'react'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import {Button} from'react-bootstrap'

const StatApp = () => {
  return (
    <Wrapper>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-5">
            <div>
                <h3 className="card-label fw-bold">Categeories</h3>
                <span className="form-text text-muted">
                    Data List Categories
                </span>
            </div>
            <div>
                <Button className="btn btn-primary font-weight-bold">
                    Create New
                </Button>
            </div>
        </div>
    </Wrapper>
  )
}

export default StatApp