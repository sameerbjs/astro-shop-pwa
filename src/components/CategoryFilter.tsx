
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { fetchCategories, fetchProducts, fetchProductsByCategory, setSelectedCategory } from '@/features/productSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector((state: RootState) => state.products);
  
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
    <div className="flex flex-wrap gap-2 my-4 animate-fade-in">
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
        All
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
  );
};

export default CategoryFilter;
