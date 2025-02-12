import React from 'react';

interface LoadingSpinnerProps {
  /** Dimensione dello spinner in pixel */
  size?: number;
  /** Colore dello spinner */
  color?: string;
  /** Testo da mostrare sotto lo spinner */
  text?: string;
  /** Classe CSS aggiuntiva per il container */
  className?: string;
}

/**
 * LoadingSpinner Component
 * 
 * Componente riutilizzabile per mostrare uno stato di caricamento
 * 
 * @example
 * // Spinner base
 * <LoadingSpinner />
 * 
 * // Spinner personalizzato
 * <LoadingSpinner 
 *   size={40} 
 *   color="#00205B"
 *   text="Caricamento in corso..."
 * />
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = '#00205B',
  text,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <span className="mt-2 text-sm text-gray-600">{text}</span>
      )}
    </div>
  );
};

export default LoadingSpinner; 