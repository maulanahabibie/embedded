import React, { memo } from 'react'

const Search = ({
    search='',
    handleChange=()=>{},
    handleSubmit=()=>{}
}) => {
  return (
    <div className="row">
        <div className='col-12 col-md-6 row row-md mb-3 mb-md-0' >
            <div className="col-10">
                <div className="input-icon">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    name='search'
                    onChange={(e)=>handleChange(e, 'search')}
                    onKeyUp={(e) => e.key === "Enter" ? handleSubmit() : {}}
                />
                <span>
                    <i className="flaticon2-search-1 icon-md" />
                </span>
                </div>
            </div>
            <div className='col-2 p-0'>
                <button
                    className="btn btn-primary font-weight-bold"
                    onClick={()=>handleSubmit()}
                    >
                    Search
                </button>
            </div>
        </div>
    </div>
  )
}

export default memo(Search)