
import ProductDetail from '@/components/ProductDetail';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';

const ProductPage = () => {
  const selectedProduct = useSelector((state: RootState) => state.products.selectedProduct);
  
  return (
    <>
      <Helmet>
        <title>
          {selectedProduct 
            ? `${selectedProduct.title} | AstroShop` 
            : 'Product Details | AstroShop'}
        </title>
        <meta 
          name="description" 
          content={selectedProduct?.description || 'Product details at AstroShop'} 
        />
      </Helmet>
      
      <ProductDetail />
    </>
  );
};

export default ProductPage;
