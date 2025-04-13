
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import { setSearchQuery } from '@/features/productSlice';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from '@/hooks/use-debounce';

export const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.products);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  
  // Debounce search to avoid too many state updates
  const debouncedSearch = useDebouncedCallback((value: string) => {
    dispatch(setSearchQuery(value));
  }, 300);
  
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };
  
  return (
    <div className="relative w-full max-w-md mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search products..."
        value={localQuery}
        onChange={handleSearchChange}
        className="pl-10 w-full"
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;
