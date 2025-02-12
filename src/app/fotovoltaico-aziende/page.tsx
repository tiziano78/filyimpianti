import { Metadata } from 'next'
import styles from './page.module.css'
import BusCTA from '@/components/BusCTA/BusCTA'

export const metadata: Metadata = {
  title: 'Fotovoltaico per Aziende nel Nord Ovest Italia',
  description: 'Soluzioni fotovoltaiche personalizzate per aziende in Piemonte, Lombardia, Liguria e Valle d\'Aosta. Massimizza il risparmio energetico e riduci i costi operativi con i nostri impianti industriali.',
  keywords: [
    'fotovoltaico aziendale nord ovest',
    'impianti industriali Piemonte',
    'energia solare business Lombardia',
    'fotovoltaico aziende Liguria',
    'impianti fotovoltaici Valle d\'Aosta'
  ]
}

export default function FotovoltaicoAziendePage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h1 className={styles.mainTitle}>L'energia per il tuo business</h1>
        <h2 className={styles.subTitle}>L'incentivo più adatto al tuo settore</h2>
        <BusCTA />
      </div>
    </div>
  )
} 