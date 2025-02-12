'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'
import { metadata } from './metadata'
import { trackEvent } from '@/utils/analytics'
import InfoFormPopup from '@/components/forms/InfoFormPopup/InfoFormPopup'

export default function SolareTermicoArticle() {
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
          article_id: 'solare-termico',
          title: 'Solare Termico: Guida Completa'
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
        <h1>Solare Termico: La Guida Definitiva per Riscaldare l'Acqua con il Sole</h1>
        
        <div className={styles.intro}>
          <p>Il solare termico rappresenta una delle soluzioni più efficienti ed ecologiche per la produzione di acqua calda sanitaria e il supporto al riscaldamento domestico. Scopriamo insieme come funziona e perché potrebbe essere la scelta giusta per la tua casa.</p>
        </div>

        <section>
          <h2>Come Funziona un Impianto Solare Termico?</h2>
          <p>Un impianto solare termico trasforma l'energia solare in energia termica utilizzabile per il riscaldamento dell'acqua. Il sistema si compone di diversi elementi essenziali:</p>
          <ul>
            <li><strong>Collettori solari:</strong> Pannelli che catturano l'energia solare</li>
            <li><strong>Serbatoio di accumulo:</strong> Dove viene conservata l'acqua calda prodotta</li>
            <li><strong>Circuito idraulico:</strong> Sistema di tubi per la circolazione del fluido termovettore</li>
            <li><strong>Centralina di controllo:</strong> Gestisce il funzionamento dell'impianto</li>
          </ul>
        </section>

        <section>
          <h2>Tipologie di Impianti Solari Termici</h2>
          <h3>1. Sistema a Circolazione Naturale</h3>
          <ul>
            <li>Funzionamento per convezione naturale</li>
            <li>Serbatoio posizionato sopra i pannelli</li>
            <li>Installazione semplice e costi contenuti</li>
            <li>Ideale per piccole utenze</li>
          </ul>

          <h3>2. Sistema a Circolazione Forzata</h3>
          <ul>
            <li>Utilizzo di una pompa di circolazione</li>
            <li>Maggiore flessibilità nell'installazione</li>
            <li>Controllo elettronico della temperatura</li>
            <li>Perfetto per medie e grandi utenze</li>
          </ul>
        </section>

        <section>
          <h2>Vantaggi del Solare Termico</h2>
          <ul>
            <li><strong>Risparmio Energetico:</strong> Riduzione fino al 70% dei consumi per acqua calda</li>
            <li><strong>Ecosostenibilità:</strong> Energia pulita e rinnovabile, zero emissioni</li>
            <li><strong>Incentivi Fiscali:</strong> Detrazioni fino al 65% della spesa</li>
            <li><strong>Durabilità:</strong> Vita utile superiore ai 20 anni</li>
            <li><strong>Bassa Manutenzione:</strong> Richiede controlli minimi annuali</li>
          </ul>
        </section>

        <section>
          <h2>Quando Conviene Installare il Solare Termico?</h2>
          <h3>Fattori da Considerare</h3>
          <ul>
            <li><strong>Esposizione solare:</strong> Orientamento e inclinazione ottimali</li>
            <li><strong>Spazio disponibile:</strong> Superficie sufficiente sul tetto o in giardino</li>
            <li><strong>Consumi di acqua calda:</strong> Maggiore è il consumo, più rapido è il ritorno dell'investimento</li>
            <li><strong>Integrazione con sistemi esistenti:</strong> Compatibilità con l'impianto attuale</li>
          </ul>
        </section>

        <section>
          <h2>Costi e Ritorno dell'Investimento</h2>
          <p>L'investimento iniziale varia in base alla tipologia e dimensione dell'impianto:</p>
          <ul>
            <li><strong>Sistema base:</strong> Da 2.000€ per una famiglia di 4 persone</li>
            <li><strong>Sistema completo:</strong> Da 3.500€ con integrazione riscaldamento</li>
            <li><strong>Tempo di ammortamento:</strong> 3-5 anni con gli incentivi</li>
            <li><strong>Risparmio annuo:</strong> 50-70% sulla bolletta dell'acqua calda</li>
          </ul>
        </section>

        <section>
          <h2>Perché Scegliere Fily Impianti</h2>
          <ul>
            <li><strong>Esperienza Ventennale:</strong> Know-how consolidato nel settore</li>
            <li><strong>Progettazione Personalizzata:</strong> Soluzioni su misura per ogni esigenza</li>
            <li><strong>Materiali Premium:</strong> Solo componenti di alta qualità</li>
            <li><strong>Installazione Professionale:</strong> Tecnici qualificati e certificati</li>
            <li><strong>Assistenza Post-Vendita:</strong> Supporto continuo e manutenzione programmata</li>
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