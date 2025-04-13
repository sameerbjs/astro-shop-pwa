
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { fetchCategories, fetchProducts, fetchProductsByCategory, setSelectedCategory } from '@/features/productSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import { SlidersHorizontal } from 'lucide-react';

export const ProductFilters = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, filteredProducts } = useSelector((state: RootState) => state.products);
  
  useEffect(() => {
    dispatch(fetchCategories() as any);
  }, [dispatch]);
  
  const handleCategoryClick = (category: string | null) => {
    dispatch(setSelectedCategory(category));
    
    if (category === null) {
      dispatch(fetchProducts() as any);
    } else {
      dispatch(fetchProductsByCategory(category) as any);
    }
  };
  
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <SearchBar />
        
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 my-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          className={cn(
            "rounded-full text-sm",
            selectedCategory === null 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary hover:bg-secondary/80"
          )}
          onClick={() => handleCategoryClick(null)}
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "rounded-full text-sm capitalize",
              selectedCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80"
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
