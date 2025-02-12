'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { trackEvent } from '@/utils/analytics'
import styles from '../page.module.css'
import Head from 'next/head'
import { metadata } from './metadata'
import Link from 'next/link'
import type { OGImage, BlogMetadata } from '@/types/metadata'

export default function ContoTermicoPage() {
  useEffect(() => {
    trackEvent('article_view', { 
      article_id: 'conto-termico',
      category: 'Incentivi'
    })
  }, [])

  const getImageUrl = (images?: OGImage[] | string[]): string => {
    if (!images || images.length === 0) return ''
    const firstImage = images[0]
    if (typeof firstImage === 'string') return firstImage
    return firstImage.url instanceof URL ? firstImage.url.toString() : firstImage.url
  }

  const typedMetadata = metadata as BlogMetadata

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": typedMetadata.title || '',
    "description": typedMetadata.description || '',
    "image": getImageUrl(typedMetadata.openGraph?.images),
    "datePublished": typedMetadata.openGraph?.publishedTime || new Date().toISOString(),
    "dateModified": typedMetadata.openGraph?.modifiedTime || typedMetadata.openGraph?.publishedTime || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "FILY Impianti",
      "url": "https://www.filyimpianti.it"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FILY Impianti",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.filyimpianti.it/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typedMetadata.openGraph?.url || ''
    },
    "keywords": Array.isArray(typedMetadata.keywords) ? typedMetadata.keywords.join(", ") : '',
    "articleSection": "Incentivi",
    "inLanguage": "it-IT"
  }

  return (
    <>
      <Head>
        <title>{String(typedMetadata.title)}</title>
        <meta name="description" content={String(typedMetadata.description || '')} />
        <meta name="keywords" content={Array.isArray(typedMetadata.keywords) ? typedMetadata.keywords.join(", ") : ''} />
        <link rel="canonical" href={String(typedMetadata.alternates?.canonical || '')} />
      </Head>

      <div className={styles.articleContainer}>
        <Link href="/blog" className={styles.backLink}>
          ← Torna al Blog
        </Link>

        <article className={styles.article}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema)
            }}
          />

          <h1>Conto Termico 3.0: La Rivoluzione dell'Efficienza Energetica con FILYIMPIANTI</h1>
          
          <div className={styles.intro}>
            <p>Ogni anno, milioni di italiani pagano bollette del gas e della luce sempre più salate. Molti si rassegnano, pensando che un impianto di riscaldamento moderno sia un lusso riservato a pochi.</p>

            <p>Quello che quasi nessuno sa, però, è che grazie al Conto Termico 3.0 puoi sostituire il tuo vecchio impianto con soluzioni all'avanguardia senza dover affrontare spese insostenibili.</p>
          </div>

          <div className={styles.highlight}>
            <p>💰 Vantaggi Principali:</p>
            <ul>
              <li>✨ Fino al 65% di rimborso diretto</li>
              <li>⚡ Accredito dell'incentivo in un'unica soluzione in soli 60 giorni</li>
              <li>📊 Impianti moderni che riducono le bollette fino al 70%</li>
            </ul>
          </div>

          <h2>Cos'è il Conto Termico 3.0 e Perché è un'Occasione da Non Perdere?</h2>
          <p>Il Conto Termico 3.0 è un incentivo economico gestito dal GSE (Gestore dei Servizi Energetici) che rimborsa direttamente una parte della spesa sostenuta per migliorare l'efficienza energetica della tua casa o azienda.</p>

          <p>Non è una detrazione fiscale come l'Ecobonus o il Superbonus. Qui i soldi li ricevi direttamente sul conto corrente, senza doverli scalare dalle tasse negli anni.</p>

          <div className={styles.highlight}>
            <h3>Quanto puoi ottenere?</h3>
            <ul>
              <li>Fino al 65% della spesa rimborsata</li>
              <li>Rimborso in un'unica soluzione (se inferiore a 5.000€) o in 5 rate annuali per importi superiori</li>
              <li>Importi più elevati per le zone climatiche più fredde</li>
            </ul>
          </div>

          <h2>Chi Può Beneficiare del Conto Termico 3.0?</h2>
          <ul className={styles.checkList}>
            <li>✅ Privati cittadini e condomini che vogliono migliorare l'efficienza della propria abitazione</li>
            <li>✅ Imprese e Partite IVA che operano in edifici commerciali, produttivi o industriali</li>
            <li>✅ Pubbliche Amministrazioni per la riqualificazione di scuole e uffici pubblici</li>
            <li>✅ ESCo (Energy Service Company) che realizzano interventi per conto di terzi</li>
          </ul>

          <div className={styles.warning}>
            <p>⚠️ Attenzione: Non è applicabile agli edifici di nuova costruzione.</p>
          </div>

          <h2>Quali Impianti Puoi Sostituire con FILYIMPIANTI?</h2>
          <p>Se hai un impianto datato, costoso e inefficiente, con il Conto Termico 3.0 puoi sostituirlo con una tecnologia moderna e ad alta efficienza.</p>

          <div className={styles.highlight}>
            <h3>Da caldaia a gasolio/GPL/carbone → a pompa di calore</h3>
            <ul>
              <li>Risparmio fino al 70% sui consumi</li>
              <li>Incentivo fino al 65%</li>
              <li>Zero emissioni locali e massimo comfort</li>
            </ul>
          </div>

          <div className={styles.highlight}>
            <h3>Da scaldabagno elettrico → a scaldacqua a pompa di calore</h3>
            <ul>
              <li>Consumi ridotti del 75%</li>
              <li>Fino al 50% di incentivo</li>
              <li>Zero gas, solo energia pulita</li>
            </ul>
          </div>

          <div className={styles.highlight}>
            <h3>Da impianto senza pannelli solari → a pannelli solari termici</h3>
            <ul>
              <li>Acqua calda gratuita grazie all'energia solare</li>
              <li>Incentivo fino al 65%</li>
              <li>Perfetta integrazione con impianti di riscaldamento moderni</li>
            </ul>
          </div>

          <h2>La Nuova Frontiera del Riscaldamento: I Pannelli Endotermici</h2>
          <p>Finora abbiamo parlato delle soluzioni già conosciute. Ma c'è qualcosa di ancora più innovativo.</p>

          <p>Un sistema di riscaldamento che non ha bisogno di caldaie, combustibili o manutenzione.</p>

          <p>Si tratta dei pannelli endotermici.</p>

          <h3>Cosa Sono i Pannelli Endotermici?</h3>
          <p>I pannelli endotermici rappresentano una rivoluzione tecnologica. Sono dispositivi sottilissimi, discreti ed efficientissimi che trasformano l'energia elettrica in calore con un rendimento straordinario.</p>

          <ul>
            <li>Riscaldamento uniforme e senza sprechi</li>
            <li>Zero manutenzione, zero combustibili, zero tubature</li>
            <li>Silenziosi, invisibili e completamente integrabili nell'arredamento</li>
            <li>Perfetti in combinazione con fotovoltaico e batterie di accumulo</li>
          </ul>

          <h2>Quanto Puoi Risparmiare? La Differenza tra le Zone Climatiche</h2>
          <p>Gli incentivi variano in base alla zona climatica dell'immobile.</p>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Zona Climatica</th>
                <th>Esempi di Città</th>
                <th>Incentivo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>Lampedusa, Porto Empedocle</td>
                <td>Basso</td>
              </tr>
              <tr>
                <td>B</td>
                <td>Cagliari, Trapani</td>
                <td>Medio-basso</td>
              </tr>
              <tr>
                <td>C</td>
                <td>Napoli, Bari</td>
                <td>Medio</td>
              </tr>
              <tr>
                <td>D</td>
                <td>Roma, Firenze, Ancona</td>
                <td>Medio-alto</td>
              </tr>
              <tr>
                <td>E</td>
                <td>Milano, Torino, Bologna</td>
                <td>Alto</td>
              </tr>
              <tr>
                <td>F</td>
                <td>Cortina, Livigno, zone montane</td>
                <td>Massimo</td>
              </tr>
            </tbody>
          </table>

          <h2>Come Accedere al Conto Termico 3.0 con FILYIMPIANTI?</h2>
          <ul>
            <li>Consulenza gratuita per individuare l'intervento più conveniente</li>
            <li>Installazione certificata da tecnici specializzati</li>
            <li>Gestione completa della pratica per ottenere l'incentivo</li>
            <li>Rimborso diretto sul tuo conto corrente entro 60 giorni</li>
          </ul>

          <h2>Perché Scegliere FILYIMPIANTI?</h2>
          <ul className={styles.checkList}>
            <li>🏠 Soluzioni su misura per la tua casa</li>
            <li>🏆 Esperienza e affidabilità per il massimo incentivo garantito</li>
            <li>⚡ Installazione rapida, sicura e certificata</li>
            <li>🔧 Tecnologie all'avanguardia, inclusi i rivoluzionari pannelli endotermici</li>
          </ul>

          <div className={styles.cta}>
            <h3>📞 Non perdere questa opportunità!</h3>
            <p>Contattaci per una consulenza gratuita e scopri quanto puoi risparmiare.</p>
            <a href="mailto:info@filyimpianti.it">📧 Richiedi Informazioni</a>
            <p>Oppure chiamaci al: <a href="tel:+393470087833">📱 347 008 7833</a></p>
          </div>
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