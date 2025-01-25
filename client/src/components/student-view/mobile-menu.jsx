import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

/**
 * MobileMenu Component
 * @param {Object} props
 * @param {Function} props.onLogOut - Function to handle logout
 */
function MobileMenu({ onLogOut }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      <Button variant="ghost" onClick={toggleMenu}>
        {isOpen ? <X /> : <Menu />}
      </Button>
      <div
        className={`
          fixed top-16 left-0 right-0 bg-white border-b p-4 space-y-4
          transition-all duration-300 ease-in-out z-10
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
        `}
      >
        <Link to="/courses" className="block transition-colors duration-200 hover:text-primary" onClick={toggleMenu}>
          Explore Courses
        </Link>
        <Link to="/my-courses" className="block transition-colors duration-200 hover:text-primary" onClick={toggleMenu}>
          My Courses
        </Link>
        <Button
          onClick={() => {
            onLogOut()
            toggleMenu()
          }}
          className="w-full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default MobileMenu;
