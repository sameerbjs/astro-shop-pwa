import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/features/store';
import { toggleCart } from '@/features/cartSlice';
import { Link } from 'react-router-dom';
import { ShoppingCart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from './ThemeToggle';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const Navbar = () => {
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const presentAddToHome = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setDeferredPrompt(null);
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold gradient-text">AstroShop</h1>
        </Link>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
            onClick={() => dispatch(toggleCart())}
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                {cartItemsCount}
              </Badge>
            )}
          </Button>

          <Button
            variant="outline"
            ref={buttonRef}
            size="icon"
            className="relative rounded-full"
            disabled={!deferredPrompt}
            onClick={presentAddToHome}
            aria-label="Install App"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;