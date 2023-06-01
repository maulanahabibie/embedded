import React from 'react'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import {Button} from'react-bootstrap'
import { Search } from '../../../components'

const Admin = () => {
  return (
    <Wrapper>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-md-5">
            <div>
                <h3 className="card-label fw-bold">List User</h3>
                <span className="form-text text-muted">
                    Data List User
                </span>
            </div>
            <div>
                <Button className="btn btn-primary font-weight-bold">
                    Create New
                </Button>
            </div>
        </div>
        <div className='mb-2'>
            <Search 
                // search={search}
                // handleChange={handleChange}
                // handleSubmit={handleSubmit}
            />
        </div>
        <hr style={{height: "36px"}}/>
        <div className='table-responsive'>
            <table className='table table-primary text-center fw-bold'>
                <thead className='p-3'>
                    <tr>
                        <td width='5%'>No</td>
                        <td width='30%'>Nama User</td>
                        <td width='10%'>Role</td>
                        <td width='10%'>Publish</td>
                        <td width='10%'>Action</td>
                    </tr>
                </thead>
            </table>

        </div>
    </Wrapper>
  )
}

export default Admin