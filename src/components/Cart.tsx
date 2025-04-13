
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '@/features/cartSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const Cart = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  
  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart");
  };
  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };
  
  const handleCheckout = () => {
    toast.success("Thank you for your purchase!");
    dispatch(clearCart());
    dispatch(toggleCart());
  };
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(toggleCart())}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Your Cart
          </DialogTitle>
        </DialogHeader>
        
        {items.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button 
              variant="outline" 
              onClick={() => dispatch(toggleCart())}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-[60vh] overflow-auto space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <Link 
                    to={`/product/${item.id}`} 
                    onClick={() => dispatch(toggleCart())}
                    className="shrink-0"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 object-contain bg-white rounded p-2" 
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/product/${item.id}`}
                      onClick={() => dispatch(toggleCart())}
                      className="hover:underline font-medium line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between font-medium">
                <span>Total:</span>
                <span className="text-lg">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
