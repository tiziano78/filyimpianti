import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { clearCache, isCacheExpired } from '@/utils/componentCache';

export const useCacheCleanup = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Pulisci la cache quando cambia la pagina
    clearCache();

    // Pulisci la cache quando la finestra viene chiusa
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', clearCache);
    }

    // Imposta un intervallo per controllare la scadenza della cache
    const interval = setInterval(() => {
      if (isCacheExpired()) {
        clearCache();
      }
    }, 60000); // Controlla ogni minuto

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', clearCache);
      }
      clearInterval(interval);
    };
  }, [pathname, searchParams]); // La cache viene pulita quando cambia l'URL
}; 