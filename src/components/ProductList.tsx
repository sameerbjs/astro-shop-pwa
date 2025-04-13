
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { fetchProducts } from '@/features/productSlice';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductList = () => {
  const dispatch = useDispatch();
  const { filteredProducts, status, error } = useSelector((state: RootState) => state.products);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any);
    }
  }, [status, dispatch]);
  
  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }
  
  if (status === 'failed') {
    return <div className="text-destructive text-center my-8">Error: {error}</div>;
  }
  
  if (filteredProducts.length === 0) {
    return <div className="text-center my-8">No products found</div>;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
