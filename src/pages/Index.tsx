
import { useEffect } from 'react';
import ProductList from '@/components/ProductList';
import CategoryFilter from '@/components/CategoryFilter';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  useEffect(() => {
    // This is where we would check for PWA install eligibility
    // and show install prompt on first visit
    if ('serviceWorker' in navigator && window.matchMedia('(display-mode: browser)').matches) {
      let deferredPrompt: any;

      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Show the install prompt after a delay
        setTimeout(() => {
          if (deferredPrompt && !localStorage.getItem('pwaInstallPromptShown')) {
            deferredPrompt.prompt();
            
            deferredPrompt.userChoice.then((choiceResult: any) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
              } else {
                console.log('User dismissed the install prompt');
              }
              deferredPrompt = null;
            });
            
            localStorage.setItem('pwaInstallPromptShown', 'true');
          }
        }, 3000);
      });
    }
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
        
        <CategoryFilter />
        <ProductList />
      </div>
    </>
  );
};

export default Index;
