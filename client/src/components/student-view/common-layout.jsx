import { Outlet } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import Footer from './footer'
import MiniCart from "./mini-cart";
import { useLocation } from 'react-router-dom';

function StudentViewCommonLayout() {

  const location = useLocation();
  const hideHeaderPaths = ['/forgot-password', '/reset-password'];
  
  // Check if current path starts with any of the paths where header should be hidden
  const shouldHideHeader = hideHeaderPaths.some(path => 
    location.pathname.startsWith(path)
  );


  return (
    <div>
      {!shouldHideHeader && <StudentViewCommonHeader />}
      <div>
      <Outlet/>
      </div>
      <MiniCart/>
      <Footer/>
    </div>
  );
}   

export default StudentViewCommonLayout;