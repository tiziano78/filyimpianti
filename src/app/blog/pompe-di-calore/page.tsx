'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'
import { metadata } from './metadata'
import { trackEvent } from '@/utils/analytics'
import InfoFormPopup from '@/components/forms/InfoFormPopup/InfoFormPopup'

export default function PDCArticle() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.body.scrollHeight
      
      // Mostra il popup quando l'utente è vicino alla fine dell'articolo (90%)
      if (scrollPosition > documentHeight * 0.9) {
        setShowPopup(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

    // Tracking della visualizzazione dell'articolo
    const trackArticleView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'article_view', {
          article_id: 'pompe-di-calore',
          title: 'Pompe di Calore: La Guida Completa'
        })
      }
    }
    trackArticleView()
  }, [])

  return (
    <div className={styles.articleContainer}>
      <Link href="/blog" className={styles.backLink}>
        ← Torna al Blog
      </Link>
      
      <article className={styles.article}>
        <h1>Pompe di Calore: La Guida Completa al Funzionamento e ai Vantaggi</h1>
        
        <div className={styles.intro}>
          <p>Nel panorama delle soluzioni energetiche sostenibili, le pompe di calore rappresentano una tecnologia rivoluzionaria. Non solo permettono di riscaldare o raffreddare un edificio in modo efficiente, ma offrono anche un'alternativa ecologica alle caldaie tradizionali.</p>
        </div>

        <section>
          <h2>Cosa Sono e Come Funzionano?</h2>
          <p>Le pompe di calore trasferiscono energia termica da una fonte naturale (aria, acqua o terra) a un ambiente interno, utilizzando un ciclo termodinamico. Il loro funzionamento si basa su quattro elementi principali:</p>
          <ul>
            <li><strong>Evaporatore:</strong> Assorbe calore dalla fonte esterna, trasformando il refrigerante in gas</li>
            <li><strong>Compressore:</strong> Aumenta temperatura e pressione del gas</li>
            <li><strong>Condensatore:</strong> Cede calore all'ambiente interno, riscaldando aria o acqua</li>
            <li><strong>Valvola di espansione:</strong> Riduce pressione e temperatura del fluido, ricominciando il ciclo</li>
          </ul>
        </section>

        <section>
          <h2>Tipologie di Pompe di Calore</h2>
          <ul>
            <li>
              <strong>Aria-Aria:</strong>
              <ul>
                <li>Ideale per climatizzare ambienti</li>
                <li>Semplice da installare</li>
                <li>Meno efficiente in climi freddi</li>
              </ul>
            </li>
            <li>
              <strong>Aria-Acqua:</strong>
              <ul>
                <li>Riscalda acqua per termosifoni o pannelli radianti</li>
                <li>Compatibile con impianti esistenti</li>
                <li>Buon compromesso tra costi e prestazioni</li>
              </ul>
            </li>
            <li>
              <strong>Geotermiche:</strong>
              <ul>
                <li>Prelevano calore stabile dal terreno</li>
                <li>Costi iniziali alti</li>
                <li>Efficienza elevata e costante</li>
              </ul>
            </li>
            <li>
              <strong>Acqua-Acqua:</strong>
              <ul>
                <li>Utilizzano fonti idriche</li>
                <li>Ideali per grandi edifici o industrie</li>
                <li>Massima efficienza tra tutte le tipologie</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2>Quando Conviene Installare una Pompa di Calore?</h2>
          <h3>1. In un'Abitazione Ben Isolata</h3>
          <p>L'efficienza dipende molto dall'isolamento termico dell'edificio. In una casa con pareti, tetto e finestre ben isolati, la pompa di calore richiede meno energia per mantenere una temperatura confortevole.</p>

          <h3>2. In Zone Climatiche Moderate</h3>
          <p>In aree con inverni miti o moderati, le pompe aria-aria o aria-acqua funzionano in modo altamente efficiente. Per climi più rigidi, le pompe geotermiche sono più indicate.</p>

          <h3>3. Per Accedere agli Incentivi Statali</h3>
          <p>Grazie agli incentivi fiscali e ai bonus per l'efficienza energetica, l'installazione può diventare molto conveniente, con detrazioni fino al 65%.</p>
        </section>

        <section>
          <h2>Vantaggi delle Pompe di Calore</h2>
          <ul>
            <li><strong>Efficienza Energetica:</strong> Fino a 4 kWh di energia termica per ogni kWh elettrico consumato</li>
            <li><strong>Riduzione dei Costi:</strong> Tagliano le bollette grazie a un consumo ridotto di energia primaria</li>
            <li><strong>Sostenibilità:</strong> Sfruttano fonti rinnovabili, riducendo le emissioni di CO₂</li>
            <li><strong>Versatilità:</strong> Riscaldamento, raffrescamento e produzione di acqua calda sanitaria</li>
            <li><strong>Sicurezza:</strong> Nessuna combustione, nessun rischio di fughe di gas</li>
          </ul>
        </section>

        <section>
          <h2>Perché Scegliere Fily Impianti</h2>
          <ul>
            <li><strong>Consulenza Professionale:</strong> Analisi dettagliata delle tue esigenze</li>
            <li><strong>Installatori Certificati:</strong> Personale altamente qualificato</li>
            <li><strong>Prodotti di Qualità:</strong> Collaborazione con i migliori marchi</li>
            <li><strong>Assistenza Completa:</strong> Dalla progettazione alla manutenzione</li>
            <li><strong>Gestione Incentivi:</strong> Supporto per l'accesso alle detrazioni fiscali</li>
          </ul>
        </section>
      </article>

      {showPopup && <InfoFormPopup />}

      <button 
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ⬆ Torna all'inizio
      </button>
    </div>
  )
} 