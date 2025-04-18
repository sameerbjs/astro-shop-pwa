
import { useEffect } from 'react';
import ProductList from '@/components/ProductList';
import ProductFilters from '@/components/ProductFilters';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  useEffect(() => {
  
  }, []);

  return (
    <>
      <Helmet>
        <title>AstroShop - Futuristic E-Commerce</title>
        <meta name="description" content="Discover our amazing collection of products at AstroShop" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 gradient-text">Welcome to AstroShop</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked products with futuristic design and outstanding quality.
          </p>
        </div>

        <ProductFilters />
        <ProductList />
      </div>
    </>
  );
};

export default Index;
