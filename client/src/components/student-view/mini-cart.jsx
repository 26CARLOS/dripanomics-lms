import { useContext, useState } from 'react';
import { StudentContext } from '@/context/student-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/auth-context';

function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useContext(StudentContext);
  const {auth}= useContext(AuthContext)
  const isAdmin = auth?.user?.role === 'admin'
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/cart') {
    return null;
  }

  return (
    
    <div className={`fixed flex justify-center left-4 bottom-4 z-50 ${isAdmin ? 'hidden' : ''}`}>
      {isOpen ? (
        <Card className="p-4 w-64 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Cart ({cartCount} items)</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            className="w-full" 
            onClick={() => navigate('/cart', {replace:true})}
          >
            View Cart
          </Button>
        </Card>
      ) : (
        <Button
          className="rounded-full h-16 w-16"
          onClick={() => setIsOpen(true)}
        >
          <ShoppingBag  width={40} height={40}/>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      )}
    </div>
  );
}

export default MiniCart;