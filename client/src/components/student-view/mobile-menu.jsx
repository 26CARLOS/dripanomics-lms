import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import CartIcon from "@/components/cart/cart-icon"


/**
 * MobileMenu Component
 * @param {Object} props
 * @param {Function} props.onLogOut - Function to handle logout
 */
function MobileMenu({ onLogOut, isAdmin, authenticated }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden flex fex-row justify-center items-center space-x-4 left-4 overflow-x-hidden h-[42px]">
      { !isAdmin ?
        <CartIcon/> : null
        }
      <Button variant="ghost" onClick={toggleMenu}>
        {isOpen ? <X /> : <Menu className='w-8 h-8'/>}
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
        {!isAdmin && (
          <Link to="/my-courses" className="block transition-colors duration-200 hover:text-primary" onClick={toggleMenu}>
          My Courses
        </Link>
      )}

        {/* Add Admin Navigation for admin users */}
        {isAdmin && (
          <Link to="/admin" className="block transition-colors duration-200 hover:text-primary">
            Admin Dashboard
          </Link>
        )}

        {

          authenticated ? 
          <Button
          onClick={() => {
            onLogOut()
            toggleMenu()
          }}
          className="w-full"
        >
          Sign Out
        </Button> :
        <Button>
          <Link to="/auth" className="w-full">Get Started</Link>
        </Button>

        }

        
      </div>
    </div>
  )
}

export default MobileMenu;
