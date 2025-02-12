'use client'

import { useStarlink } from '@/context/StarlinkContext'
import styles from './StarlinkPopup.module.css'

export default function StarlinkPopup() {
  const { isOpen, closeStarlinkPopup } = useStarlink()

  if (!isOpen) return null

  return (
    <div className={styles['starlink-popup-overlay']} onClick={closeStarlinkPopup}>
      <div className={styles['starlink-popup']}>
        <button 
          className={styles['starlink-popup-close']} 
          onClick={closeStarlinkPopup}
        >
          Chiudi
        </button>
        <h4 className={styles['starlink-popup-title']}>
          NON IMPORTA DOVE SEI! CON ENERGIA SOLARE E L'ANTENNA STARLINK PUOI VIVERE IN MODO SOSTENIBILE E SEMPRE CONNESSO.
        </h4>
        <p className={styles['starlink-popup-subtitle']}>
          Connessione stabile, energia pulita e totale indipendenza, ottieni tutto con il tuo impianto fotovoltaico e il nostro omaggio esclusivo!<br/>
          Contattaci su WhatsApp per conoscere l'offerta
        </p>
        <a 
          href="https://wa.me/+393517655426" 
          className={styles['starlink-popup-whatsapp']} 
          target="_blank"
          rel="noopener noreferrer"
        >
          Contattaci su WhatsApp
        </a>
      </div>
    </div>
  )
} 