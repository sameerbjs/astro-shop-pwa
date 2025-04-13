
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { fetchProductById, clearSelectedProduct } from '@/features/productSlice';
import { addToCart } from '@/features/cartSlice';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector((state: RootState) => state.products);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)) as any);
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);
  
  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
      toast.success(`Added ${selectedProduct.title} to cart`);
    }
  };
  
  if (status === 'loading' || !selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/2 aspect-square" />
          <div className="w-full md:w-1/2">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-8" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (status === 'failed') {
    return <div className="container mx-auto px-4 py-8 text-destructive">Error: {error}</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link to="/" className="flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to products
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white rounded-lg p-8 flex items-center justify-center">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.title}
            className="max-h-80 object-contain"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{selectedProduct.title}</h1>
          
          <div className="flex items-center mb-4">
            <span className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full capitalize mr-3">
              {selectedProduct.category}
            </span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 mr-1">{selectedProduct.rating.rate}</span>
              <span className="text-muted-foreground">({selectedProduct.rating.count} reviews)</span>
            </div>
          </div>
          
          <p className="text-3xl font-bold mb-6">${selectedProduct.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground mb-8">{selectedProduct.description}</p>
          
          <Button 
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
