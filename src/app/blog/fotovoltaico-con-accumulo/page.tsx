'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'
import { metadata } from './metadata'
import { trackEvent } from '@/utils/analytics'

export default function FotovoltaicoAccumuloArticle() {
  useEffect(() => {
    trackEvent('article_view', {
      article_id: 'fotovoltaico-con-accumulo',
      title: metadata.title?.toString() || ''
    })
  }, [])

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metadata.title?.toString() || '',
    "description": metadata.description?.toString() || '',
    "image": "https://www.filyimpianti.it/images/blog/fotovoltaico-accumulo.webp",
    "author": {
      "@type": "Organization",
      "name": "Fily Impianti",
      "url": "https://www.filyimpianti.it"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fily Impianti",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.filyimpianti.it/logo.webp"
      }
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-01-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.filyimpianti.it/blog/fotovoltaico-con-accumulo"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className={styles.articleContainer}>
        <Link href="/blog" className={styles.backLink}>
          ← Torna al Blog
        </Link>
        
        <article className={styles.article}>
          <h1>{metadata.title?.toString() || ''}</h1>
          
          <div className={styles.intro}>
            <p>{metadata.description?.toString() || ''}</p>
          </div>

          <section>
            <h2>Cos'è un Sistema di Accumulo Fotovoltaico?</h2>
            <p>Un sistema di accumulo fotovoltaico è composto da batterie che immagazzinano l'energia prodotta dai pannelli solari quando non viene immediatamente consumata. Questa energia può essere utilizzata nelle ore serali o nei momenti di maggior fabbisogno.</p>
            
            <div className={styles.highlight}>
              <p>📌 Componenti principali:</p>
              <ul>
                <li>🔋 Pannelli fotovoltaici</li>
                <li>🔌 Inverter (possibilmente ibrido)</li>
                <li>⚡ Batterie di accumulo</li>
                <li>💻 Sistema di gestione dell'energia</li>
              </ul>
            </div>
          </section>

          <section>
            <h2>Vantaggi dell'Accumulo Energetico</h2>
            <ul className={styles.checkList}>
              <li>✅ Maggiore Autoconsumo: Utilizzo fino all'80% dell'energia prodotta</li>
              <li>✅ Indipendenza Energetica: Ridotta dipendenza dalla rete elettrica</li>
              <li>✅ Risparmio in Bolletta: Drastica riduzione dei costi energetici</li>
              <li>✅ Backup Energetico: Energia disponibile anche in caso di blackout</li>
              <li>✅ Protezione dal Rincaro: Minor impatto dall'aumento dei prezzi dell'energia</li>
            </ul>
          </section>

          <section>
            <h2>Tipologie di Batterie Disponibili</h2>
            <h3>1. Batterie al Litio</h3>
            <ul>
              <li>Maggiore efficienza e durata</li>
              <li>Ingombro ridotto</li>
              <li>Manutenzione minima</li>
              <li>Cicli di carica/scarica elevati</li>
            </ul>

            <h3>2. Batterie al Gel</h3>
            <ul>
              <li>Costo inferiore</li>
              <li>Tecnologia consolidata</li>
              <li>Maggior ingombro</li>
              <li>Durata inferiore</li>
            </ul>
          </section>

          <section>
            <h2>Dimensionamento del Sistema</h2>
            <p>Il corretto dimensionamento è fondamentale per ottimizzare l'investimento. Ecco i fattori da considerare:</p>
            <ul>
              <li><strong>Consumo Energetico:</strong> Analisi dettagliata dei consumi giornalieri</li>
              <li><strong>Potenza Impianto:</strong> Capacità di produzione dei pannelli</li>
              <li><strong>Capacità Accumulo:</strong> In base al profilo di consumo serale</li>
              <li><strong>Spazio Disponibile:</strong> Per pannelli e sistema di accumulo</li>
            </ul>
          </section>

          <section>
            <h2>Costi e Incentivi</h2>
            <h3>Investimento Iniziale</h3>
            <ul>
              <li><strong>Sistema completo 6kW:</strong> Da 15.000€ a 20.000€</li>
              <li><strong>Solo accumulo 10kWh:</strong> Da 7.000€ a 12.000€</li>
              <li><strong>Installazione:</strong> Circa 10-15% del totale</li>
            </ul>

            <h3>Incentivi Disponibili</h3>
            <ul>
              <li><strong>Detrazione Fiscale:</strong> 50% in 10 anni</li>
              <li><strong>Bonus Accumulo:</strong> Contributi regionali specifici</li>
              <li><strong>Scambio sul Posto:</strong> Valorizzazione energia immessa</li>
            </ul>
          </section>

          <section>
            <h2>Manutenzione e Durata</h2>
            <ul>
              <li><strong>Vita utile batterie:</strong> 10-15 anni per il litio</li>
              <li><strong>Garanzie:</strong> Fino a 10 anni sul sistema di accumulo</li>
              <li><strong>Manutenzione:</strong> Controlli annuali consigliati</li>
              <li><strong>Monitoraggio:</strong> Sistema di controllo remoto incluso</li>
            </ul>
          </section>

          <section>
            <h2>Perché Scegliere Fily Impianti</h2>
            <ul className={styles.checkList}>
              <li>✨ Consulenza Specializzata: Analisi personalizzata dei consumi</li>
              <li>🏆 Prodotti Certificati: Partnership con i migliori produttori</li>
              <li>👨‍🔧 Installatori Qualificati: Team di professionisti certificati</li>
              <li>🛠️ Assistenza Completa: Dalla progettazione alla manutenzione</li>
              <li>🔒 Garanzia Estesa: Copertura superiore allo standard</li>
            </ul>
          </section>
        </article>

        <button 
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ⬆ Torna all'inizio
        </button>
      </div>
    </>
  )
} 