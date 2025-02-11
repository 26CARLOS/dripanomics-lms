import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { StudentContext } from "@/context/student-context";

function CartIcon() {
  const { cartCount, toggleMiniCart } = useContext(StudentContext);
 
  return (
    <div className="relative cursor-pointer" onClick={toggleMiniCart}>
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </div>
  );
}

export default CartIcon