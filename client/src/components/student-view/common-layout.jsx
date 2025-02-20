import { Outlet } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import Footer from './footer'
import MiniCart from "./mini-cart";
import { useLocation } from 'react-router-dom';

function StudentViewCommonLayout() {
  const location = useLocation();
  const hideHeaderPaths = ['/forgot-password', '/reset-password'];
  
  const shouldHideHeader = hideHeaderPaths.some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      {!shouldHideHeader && <StudentViewCommonHeader />}
      <div className="flex-1 flex flex-col"> {/* Add padding bottom */}
        <main className="flex-1">
          <Outlet/>
        </main>
      </div>
      <MiniCart/>
      <Footer className="mt-auto" /> {/* Force footer to bottom */}
    </div>
  );
}

export default StudentViewCommonLayout;