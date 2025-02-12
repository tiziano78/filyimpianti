'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'
import InfoFormPopup from '@/components/forms/InfoFormPopup/InfoFormPopup'

export default function CostoImpiantoArticle() {
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
          article_id: 'costo-impianto-fotovoltaico',
          title: 'Quanto Costa Installare un Impianto Fotovoltaico?'
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
        <h1>Quanto Costa Installare un Impianto Fotovoltaico? Una Guida Completa sui Fattori che Influiscono sul Prezzo</h1>
        
        <div className={styles.intro}>
          <p>L'installazione di un impianto fotovoltaico rappresenta un investimento importante per il futuro della tua casa o azienda. Ma quali sono i costi reali e i fattori che li influenzano? In questa guida analizzeremo nel dettaglio tutti gli aspetti economici da considerare.</p>
        </div>

        <section>
          <h2>Il Costo dei Pannelli Fotovoltaici</h2>
          <p>Il prezzo dei pannelli rappresenta una delle principali voci di spesa e varia in base alla qualità e al produttore.</p>
          <ul>
            <li><strong>Costo medio:</strong> Da 0,45 € a 0,80 € per watt</li>
            <li><strong>Esempio pratico:</strong> Per un impianto da 6 kWp, il costo dei pannelli può variare tra 2.700 € e 4.800 €</li>
            <li><strong>Fattori di variazione:</strong> Marca, efficienza, garanzie offerte</li>
          </ul>
        </section>

        <section>
          <h2>Il Costo dell'Installazione</h2>
          <p>L'installazione comprende manodopera, materiali di montaggio e tempi di lavoro. Questa voce è calcolata generalmente in base alla potenza installata.</p>
          <ul>
            <li><strong>Costo medio:</strong> Da 350 € a 450 € per kWp</li>
            <li><strong>Esempio:</strong> Un impianto da 6 kWp richiede un investimento di 2.100 € - 2.700 € per l'installazione</li>
            <li><strong>Tempistiche:</strong> 2-3 giorni lavorativi per un impianto standard</li>
          </ul>
        </section>

        <section>
          <h2>L'Inverter: il Cuore del Sistema</h2>
          <ul>
            <li><strong>Costo base:</strong> Da 350 € a 1.200 €</li>
            <li><strong>Inverter per uso domestico:</strong> 800 € - 1.000 € in media</li>
            <li><strong>Fattori di scelta:</strong> Potenza, marca, funzionalità smart</li>
          </ul>
        </section>

        <section>
          <h2>Gli Ottimizzatori di Potenza</h2>
          <ul>
            <li><strong>Costo per unità:</strong> Da 80 € a 140 €</li>
            <li><strong>Esempio:</strong> Per 15 pannelli, investimento tra 1.200 € e 2.100 €</li>
            <li><strong>Vantaggi:</strong> Maggiore efficienza, monitoraggio individuale</li>
          </ul>
        </section>

        <section>
          <h2>Le Batterie per l'Accumulo</h2>
          <ul>
            <li><strong>Costo per kWh:</strong> Da 700 € a 1.200 €</li>
            <li><strong>Esempio:</strong> Batteria da 10 kWh, spesa tra 7.000 € e 12.000 €</li>
            <li><strong>Tipologie:</strong> Litio, piombo-acido, tecnologie emergenti</li>
          </ul>
        </section>

        <section>
          <h2>Costi Extra da Considerare</h2>
          <h3>Accesso al Tetto e Sicurezza</h3>
          <ul>
            <li><strong>Trabattello o scala:</strong> Incluso nel prezzo standard</li>
            <li><strong>Piattaforma aerea:</strong> 200 € - 300 € al giorno</li>
            <li><strong>Ponteggi:</strong> Necessari per condomini, costo variabile</li>
          </ul>

          <h3>Pratiche Burocratiche</h3>
          <ul>
            <li><strong>Costo base:</strong> Da 250 € in su</li>
            <li><strong>Include:</strong> Permessi, documentazione tecnica</li>
            <li><strong>Gestione:</strong> Affidata a professionisti qualificati</li>
          </ul>
        </section>

        <section>
          <h2>Potenziamento del Contatore</h2>
          <ul>
            <li><strong>Costo:</strong> 80 € per kW aggiuntivo</li>
            <li><strong>Esempio:</strong> Da 3 kW a 6 kW = 240 €</li>
            <li><strong>Procedura:</strong> Gestita dal fornitore di energia</li>
          </ul>
        </section>

        <section>
          <h2>Perché Scegliere Fily Impianti</h2>
          <ul>
            <li><strong>Trasparenza totale</strong> sui costi e preventivi dettagliati</li>
            <li><strong>Gestione completa</strong> delle pratiche burocratiche</li>
            <li><strong>Garanzia di qualità</strong> su materiali e installazione</li>
            <li><strong>Assistenza post-vendita</strong> garantita</li>
            <li><strong>Esperienza pluriennale</strong> nel settore</li>
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