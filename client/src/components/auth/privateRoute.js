import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = ({isAuthenticated}) => {
  if(isAuthenticated === null) return null;
      return(
        <>
            {isAuthenticated ? <Outlet/> : <Navigate to="/signin" />}
        </>
      )
}

export default PrivateRoute;