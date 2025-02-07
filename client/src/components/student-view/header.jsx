import { GraduationCap, MonitorPlayIcon as TvMinimalPlay, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useContext } from "react"
import { AuthContext } from "../../context/auth-context"
import { useNavigate } from "react-router-dom"
import MobileMenu  from "./mobile-menu"
import CartIcon from "@/components/cart/cart-icon"

function StudentViewCommonHeader() {
  const navigate = useNavigate()
  const { auth ,resetCredentials } = useContext(AuthContext)

  function handleLogOut() {
    resetCredentials()
    sessionStorage.clear()
    navigate("/auth")
  }

  return (
    <header className="flex items-center justify-between p-4 border-b w-full z-10 bg-white " >
      <div className="flex items-center">
        <Link to="home" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 mr-2 hover:text-gray-800" />
          <span className="font-extrabold text-lg md:text-xl">Dripanomics Tutorials</span>
          {auth?.user?.role === 'admin'&&(<Badge>Admin</Badge>)}
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-4">
        <Button variant="ghost" className="text-base font-medium" onClick={() => navigate("/courses")}>
          Explore Courses
        </Button>
        {auth?.user?.role === 'user' &&(<div onClick={() => navigate("/my-courses")} className="cursor-pointer flex items-center space-x-2">
          <span className="font-medium text-base">My Courses</span>
          
        </div>)}

      {/* Add Admin Navigation for admin users */}
      {auth?.user?.role === 'admin' && (
                <Button variant="outline" onClick={() => navigate("/admin")} className="text-base font-medium">
                  Admin Dashboard
                </Button>
        )}

        <CartIcon className="cursor-pointer"/>
        {
          auth.authenticated ?
            <Button onClick={handleLogOut} className="text-base font-medium">
            Sign Out
            <LogOut className="ml-2 h-4 w-4" />
            </Button> :
            <Button>
              <Link to="/auth" className="text-base font-medium">Get Started</Link>
            </Button>
        }
        
      </nav>

      <MobileMenu onLogOut={handleLogOut} isAdmin={auth?.user?.role === 'admin' } authenticated={auth.authenticated}/>
    </header>
  )
}

export default StudentViewCommonHeader

