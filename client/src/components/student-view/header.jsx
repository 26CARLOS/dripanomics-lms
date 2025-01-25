import { GraduationCap, MonitorPlayIcon as TvMinimalPlay, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { AuthContext } from "../../context/auth-context"
import { useNavigate } from "react-router-dom"
import MobileMenu  from "./mobile-menu"

function StudentViewCommonHeader() {
  const navigate = useNavigate()
  const { resetCredentials } = useContext(AuthContext)

  function handleLogOut() {
    resetCredentials()
    sessionStorage.clear()
  }

  return (
    <header className="flex items-center justify-between p-4 border-b relative w-full">
      <div className="flex items-center">
        <Link to="home" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 mr-2 hover:text-gray-800" />
          <span className="font-extrabold text-lg md:text-xl">Dripanomics Tutorials</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-4">
        <Button variant="ghost" className="text-base font-medium" onClick={() => navigate("/courses")}>
          Explore Courses
        </Button>
        <div onClick={() => navigate("/my-courses")} className="cursor-pointer flex items-center space-x-2">
          <span className="font-medium text-base">My Courses</span>
          <TvMinimalPlay className="h-5 w-5" />
        </div>
        <Button onClick={handleLogOut} className="text-base font-medium">
          Sign Out
          <LogOut className="ml-2 h-4 w-4" />
        </Button>
      </nav>

      <MobileMenu onLogOut={handleLogOut} />
    </header>
  )
}

export default StudentViewCommonHeader

