
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./features/store";
import { setTheme } from "./features/themeSlice";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// We need to wrap the app in providers, then create our actual app component
const AppContent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    // Set theme on initial render
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Helmet>
          <meta name="theme-color" content={theme === 'dark' ? '#1a1a1a' : '#ffffff'} />
        </Helmet>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Cart />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </TooltipProvider>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>
);

export default App;
