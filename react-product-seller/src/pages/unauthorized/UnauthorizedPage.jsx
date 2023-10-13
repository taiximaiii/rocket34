import React from 'react'
import { Link } from 'react-router-dom'
const UnauthorizedPage = () => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center">
          <span className="display-1">
            401
          </span>
        <div className="mb-4 lead">
           Unauthorized access to the resource is denied
        </div>
        <Link className="btn btn-link" to="/">
            Back to Home
        </Link>
        </div>
     </div>
    </div>
  )
}

export default UnauthorizedPage