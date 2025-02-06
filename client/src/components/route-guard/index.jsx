import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RouteGuard({authenticated, user, element}){
    const location = useLocation();

    // Allow access to home page without authentication
    if (!authenticated && location.pathname === '/home') {
        return <Fragment>{element}</Fragment>;
    }

    // Redirect unauthenticated users to login
    if(!authenticated && !location.pathname.includes('/auth')){
        return <Navigate to='/auth' />
    }

    // Prevent non-admin users from accessing admin routes
    if(authenticated && user?.role !== 'admin' && location.pathname.includes('admin')){
        return <Navigate to='/home' />
    }

    // Prevent authenticated users from accessing auth pages
    if(authenticated && location.pathname.includes('/auth')){
        return <Navigate to={user?.role === 'admin' ? '/admin' : '/home'} />
    }

    return <Fragment>{element}</Fragment>
}

export default RouteGuard;