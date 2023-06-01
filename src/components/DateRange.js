import React, { memo } from 'react'

const DateRange = ({
    startDate='', endDate=''
}) => {
    const isDateValid = (startDate, endDate) => {
        return new Date(startDate).getTime() <= new Date(endDate).getTime();
      };
  return (
    <div className="row">
        <div className="col-md-3">
            <label className="col-form-label">From</label>
            <div className="input-group">
                <input
                className={`form-control ${isDateValid(startDate, endDate)
                    ? ""
                    : "is-invalid"
                    }`}
                type="date"
                name="startDate"
                defaultValue={startDate}
                // onChange={(e)=>handleChangeFilters(e, 'filter')}
                max={endDate}
                />
            </div>
        </div>
        <div className="col-md-3">
            <label className="col-form-label">To</label>
            <div className="input-group ">
                <input
                    className={`form-control ${isDateValid(startDate, endDate)
                        ? ""
                        : "is-invalid"
                        }`}
                    type="date"
                    name="endDate"
                    defaultValue={endDate}
                    // onChange={(e)=>handleChangeFilters(e, 'filter')}
                    min={startDate}
                />
                <div className="input-group-append">
                    <button
                        style={{ backgroundColor: '#C9F7F5' }}
                        className="btn font-weight-bold text-primary"
                        // onClick={handleSubmitSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default memo(DateRange)