import { ShoppingCart } from "lucide-react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { StudentContext } from "@/context/student-context"

export function CartIcon() {
  const { cartCount } = useContext(StudentContext);

  const navigate = useNavigate();
 
  return (
    <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </div>
  )
}

export default CartIcon;