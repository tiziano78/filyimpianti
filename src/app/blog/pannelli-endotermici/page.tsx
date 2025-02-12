'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { trackEvent } from '@/utils/analytics'
import styles from '../page.module.css'
import { seoConfig } from './seo-config'
import Head from 'next/head'
import Link from 'next/link'

export default function PannelliEndotermiciPage() {
  useEffect(() => {
    trackEvent('article_view', { 
      article_id: 'pannelli-endotermici',
      category: seoConfig.category
    })
  }, [])

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoConfig.title,
    "description": seoConfig.description,
    "image": seoConfig.imageUrl,
    "datePublished": seoConfig.publishDate,
    "dateModified": seoConfig.publishDate,
    "author": {
      "@type": "Organization",
      "name": seoConfig.author,
      "url": "https://www.filyimpianti.it"
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.author,
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.filyimpianti.it/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seoConfig.url
    },
    "keywords": seoConfig.keywords.join(", "),
    "articleSection": seoConfig.category,
    "inLanguage": "it-IT"
  }

  return (
    <>
      <Head>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords.join(", ")} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoConfig.title} />
        <meta property="og:description" content={seoConfig.description} />
        <meta property="og:image" content={seoConfig.imageUrl} />
        <meta property="og:url" content={seoConfig.url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="FILY Impianti" />
        <meta property="article:published_time" content={seoConfig.publishDate} />
        <meta property="article:author" content={seoConfig.author} />
        {seoConfig.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.title} />
        <meta name="twitter:description" content={seoConfig.description} />
        <meta name="twitter:image" content={seoConfig.imageUrl} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoConfig.url} />
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

          <h1>{seoConfig.title}</h1>
          
          <div className={styles.intro}>
            <p>Nel contesto attuale, caratterizzato da una crescente attenzione verso la sostenibilità e l'efficienza energetica, la ricerca di soluzioni innovative per il riscaldamento degli edifici è diventata una priorità. Tra le tecnologie emergenti, i pannelli endotermici si distinguono per il loro potenziale nel fornire calore in modo efficiente e rispettoso dell'ambiente.</p>
          </div>

          <div className={styles.highlight}>
            <p>🔍 Esploreremo in dettaglio:</p>
            <ul>
              <li>🌡️ Cosa sono i pannelli endotermici</li>
              <li>⚡ Come funzionano</li>
              <li>🏭 Le loro applicazioni</li>
              <li>🔄 Il loro ruolo come alternativa alle pompe di calore</li>
            </ul>
          </div>

          <section>
            <h2>Vantaggi dei Pannelli Endotermici</h2>
            <ul className={styles.checkList}>
              <li>✅ Efficienza Energetica: Massimo rendimento con minimo consumo elettrico</li>
              <li>✅ Sostenibilità Ambientale: Zero emissioni e impatto ambientale ridotto</li>
              <li>✅ Versatilità: Adatti a ogni tipo di edificio e integrabili con sistemi esistenti</li>
              <li>✅ Manutenzione Ridotta: Design semplice e affidabile</li>
            </ul>
          </section>

          <section>
            <h2>Applicazioni Principali</h2>
            <div className={styles.highlight}>
              <p>🏠 Settore Residenziale:</p>
              <ul>
                <li>🌡️ Riscaldamento ambienti</li>
                <li>🚿 Produzione acqua calda sanitaria</li>
                <li>🏊 Riscaldamento piscine</li>
              </ul>
            </div>

            <div className={styles.highlight}>
              <p>🏭 Settore Industriale:</p>
              <ul>
                <li>🏢 Riscaldamento spazi produttivi</li>
                <li>📦 Climatizzazione magazzini</li>
                <li>🌿 Processi industriali a bassa temperatura</li>
              </ul>
            </div>
          </section>

          <div className={styles.content}>
            <h2>Introduzione</h2>
            <p>Nel contesto attuale, caratterizzato da una crescente attenzione verso la sostenibilità e l'efficienza energetica, la ricerca di soluzioni innovative per il riscaldamento degli edifici è diventata una priorità. Tra le tecnologie emergenti, i pannelli endotermici si distinguono per il loro potenziale nel fornire calore in modo efficiente e rispettoso dell'ambiente. Questo articolo esplora in dettaglio cosa sono i pannelli endotermici, come funzionano, le loro applicazioni e il loro ruolo come possibile alternativa alle pompe di calore nel riscaldamento domestico e industriale.</p>

            <h2>Cosa Sono i Pannelli Endotermici?</h2>
            <p>I pannelli endotermici sono dispositivi progettati per assorbire energia termica dall'ambiente circostante e convertirla in calore utilizzabile per il riscaldamento di ambienti interni o per altre applicazioni. A differenza dei pannelli solari tradizionali, che sfruttano principalmente la radiazione solare diretta, i pannelli endotermici sono in grado di catturare energia termica anche in condizioni di scarsa illuminazione o temperature rigide, rendendoli particolarmente versatili in diverse condizioni climatiche.</p>

            <h2>Principio di Funzionamento</h2>
            <p>Il funzionamento dei pannelli endotermici si basa sull'utilizzo di materiali avanzati e tecnologie innovative che consentono l'assorbimento e la conversione dell'energia termica ambientale. Questi pannelli sono costituiti da strati speciali che catturano il calore presente nell'aria o nel suolo e lo trasferiscono all'interno dell'edificio attraverso sistemi di distribuzione del calore, come impianti a pavimento radiante o radiatori a bassa temperatura.</p>
            <p>Un aspetto distintivo dei pannelli endotermici è la loro capacità di funzionare efficacemente anche in assenza di luce solare diretta, sfruttando il calore latente presente nell'ambiente. Questo li rende particolarmente adatti per l'uso in regioni con climi freddi o in periodi dell'anno caratterizzati da scarsa insolazione.</p>

            <h2>Vantaggi dei Pannelli Endotermici</h2>
            
            <h3>Efficienza Energetica</h3>
            <p>Uno dei principali vantaggi dei pannelli endotermici è la loro elevata efficienza energetica. Essi sono in grado di fornire una quantità significativa di calore utilizzando una minima quantità di energia elettrica, riducendo così i costi operativi e l'impatto ambientale. Questo elevato rendimento è dovuto alla capacità dei pannelli di sfruttare l'energia termica ambientale, una fonte rinnovabile e gratuita.</p>

            <h3>Sostenibilità Ambientale</h3>
            <p>Utilizzando fonti di energia rinnovabile e riducendo la dipendenza dai combustibili fossili, i pannelli endotermici contribuiscono a diminuire le emissioni di gas serra, promuovendo un approccio più ecologico al riscaldamento. Inoltre, l'assenza di processi di combustione elimina la produzione di inquinanti atmosferici, migliorando la qualità dell'aria e contribuendo alla salute pubblica.</p>

            <h3>Versatilità di Installazione</h3>
            <p>I pannelli endotermici possono essere installati in diverse tipologie di edifici, sia residenziali che commerciali, e possono essere integrati con sistemi di riscaldamento esistenti, offrendo flessibilità nelle soluzioni impiantistiche. La loro adattabilità li rende una scelta ideale sia per nuove costruzioni che per progetti di ristrutturazione o riqualificazione energetica.</p>

            <h3>Manutenzione Ridotta</h3>
            <p>Grazie alla loro progettazione semplice e all'assenza di componenti meccanici in movimento, i pannelli endotermici richiedono una manutenzione minima rispetto ad altri sistemi di riscaldamento. Questo si traduce in una maggiore affidabilità e in costi di gestione inferiori nel lungo termine.</p>

            <h2>Applicazioni dei Pannelli Endotermici</h2>

            <h3>Riscaldamento Domestico</h3>
            <p>Nel contesto residenziale, i pannelli endotermici possono essere utilizzati per riscaldare gli ambienti interni, garantendo comfort termico e riducendo i costi energetici. Possono essere installati sia in nuove costruzioni che in ristrutturazioni, adattandosi alle esigenze specifiche degli utenti. La loro capacità di funzionare efficacemente anche a basse temperature esterne li rende particolarmente adatti per abitazioni situate in regioni con climi rigidi.</p>

            <h3>Settore Industriale</h3>
            <p>In ambito industriale, i pannelli endotermici trovano applicazione nel riscaldamento di spazi produttivi, magazzini e uffici, contribuendo a migliorare l'efficienza energetica complessiva dell'azienda e a ridurre le spese operative. Inoltre, possono essere utilizzati in processi industriali che richiedono calore a bassa o media temperatura, offrendo una soluzione sostenibile e conveniente.</p>

            <h3>Integrazione con Sistemi Esistenti</h3>
            <p>I pannelli endotermici possono essere integrati con sistemi di riscaldamento esistenti, come caldaie o pompe di calore, ottimizzando le prestazioni dell'impianto e offrendo una fonte aggiuntiva di energia termica. Questa integrazione può avvenire in diverse modalità, ad esempio pre-riscaldando l'acqua di alimentazione della caldaia o supportando il sistema principale durante i picchi di domanda termica.</p>

            <h3>Applicazioni Speciali</h3>
            <p>Oltre al riscaldamento degli ambienti, i pannelli endotermici possono essere utilizzati per altre applicazioni, come il riscaldamento di piscine, serre agricole o sistemi di acqua calda sanitaria. La loro versatilità li rende adatti a una vasta gamma di utilizzi, offrendo soluzioni efficienti e sostenibili.</p>
          </div>

          <div className={styles.cta}>
            <h3>📞 Scopri i Pannelli Endotermici</h3>
            <p>Contattaci per una consulenza gratuita e scopri come i pannelli endotermici possono trasformare il tuo sistema di riscaldamento.</p>
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