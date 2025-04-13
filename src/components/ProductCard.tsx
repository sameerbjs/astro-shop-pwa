
import { Product } from '@/features/productSlice';
import { addToCart } from '@/features/cartSlice';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`Added ${product.title.substring(0, 20)}... to cart`);
  };
  
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden product-card-hover glass-card">
        <CardContent className="p-4 flex flex-col">
          <div className="bg-white rounded-lg p-6 mb-4 flex items-center justify-center h-48">
            <img 
              src={product.image} 
              alt={product.title} 
              className="h-full object-contain" 
              loading="lazy"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full capitalize">
                {product.category}
              </span>
              <div className="ml-auto flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs ml-1">{product.rating.rate}</span>
              </div>
            </div>
            
            <h3 className="font-medium line-clamp-2 h-12 mb-1">{product.title}</h3>
            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
