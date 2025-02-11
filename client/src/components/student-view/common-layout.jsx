import { Outlet } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import MiniCart from "./mini-cart";


function StudentViewCommonLayout() {
  return (
    <div>
      <StudentViewCommonHeader />
      <div>
      <Outlet/>
      </div>
      <MiniCart/>
    </div>
  );
}   

export default StudentViewCommonLayout;