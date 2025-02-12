'use client'

import Link from 'next/link'
import styles from '../page.module.css'

export default function CERArticle() {
  return (
    <div className={styles.articleContainer}>
      <Link href="/blog" className={styles.backLink}>
        ← Torna al Blog
      </Link>
      
      <article className={styles.article}>
        <h1>Comunità Energetiche Rinnovabili (CER): Come Funzionano e Come Accedere agli Incentivi</h1>
        
        <div className={styles.intro}>
          <p>Negli ultimi anni, il concetto di Comunità Energetiche Rinnovabili (CER) sta guadagnando sempre più attenzione. Si tratta di un modello innovativo che permette a cittadini, imprese e amministrazioni locali di produrre, condividere e consumare energia rinnovabile a livello locale.</p>
          
          <p>Oltre ai benefici ambientali ed economici, uno degli aspetti più interessanti delle CER è la possibilità di accedere a importanti incentivi statali, come il contributo a fondo perduto fino al 40% per i comuni con meno di 5.000 abitanti.</p>
          
          <p>Ma come funziona esattamente una CER? Chi può partecipare? E soprattutto, quali sono i passi concreti per costituirne una e ottenere gli incentivi? In questo articolo risponderemo a tutte queste domande.</p>
        </div>

        <section>
          <h2>1. Cosa Sono le Comunità Energetiche Rinnovabili?</h2>
          <p>Le CER sono entità giuridiche costituite da persone fisiche, enti pubblici o privati, piccole e medie imprese (PMI) e altre organizzazioni, con l'obiettivo di produrre e consumare energia rinnovabile in maniera condivisa.</p>
          
          <p>L'energia generata da impianti come fotovoltaico, eolico, idroelettrico o biomasse viene utilizzata dai membri della comunità, riducendo la dipendenza dalla rete elettrica tradizionale e abbattendo i costi energetici.</p>
          
          <div className={styles.highlight}>
            <p>📌 Obiettivo principale: fornire benefici ambientali, economici e sociali ai membri e al territorio, piuttosto che generare profitti finanziari.</p>
          </div>
        </section>

        <section>
          <h2>2. Come Funziona una CER?</h2>
          <p>Il principio è semplice:</p>
          <ul>
            <li>Produzione di energia rinnovabile: i membri della CER installano impianti per la produzione di energia pulita.</li>
            <li>Condivisione dell'energia: l'energia prodotta viene immessa nella rete locale e condivisa tra i membri della comunità.</li>
            <li>Benefici per tutti: chi consuma l'energia rinnovabile prodotta all'interno della CER gode di tariffe agevolate e incentivi economici.</li>
          </ul>
          <p>Le CER non vendono energia nel mercato tradizionale, ma la condividono tra i membri. Questo modello consente di ridurre le bollette e promuovere un sistema energetico più sostenibile e partecipativo.</p>
        </section>

        <section>
          <h2>3. Chi Può Partecipare a una Comunità Energetica Rinnovabile?</h2>
          <p>Le CER sono aperte a una vasta gamma di soggetti, tra cui:</p>
          <ul className={styles.checkList}>
            <li>✅ Cittadini privati</li>
            <li>✅ Piccole e Medie Imprese (PMI), a patto che la partecipazione alla CER non sia la loro attività principale</li>
            <li>✅ Enti pubblici, come Comuni, Regioni e Province</li>
            <li>✅ Enti del terzo settore e associazioni no-profit</li>
            <li>✅ Enti di ricerca e formazione</li>
            <li>✅ Parrocchie ed enti religiosi</li>
          </ul>

          <div className={styles.highlight}>
            <p>📍 Requisito fondamentale: tutti i membri devono trovarsi nella stessa area geografica e gli impianti devono essere connessi alla stessa cabina primaria di distribuzione elettrica.</p>
          </div>

          <div className={styles.warning}>
            <p>🚫 Chi non può partecipare:</p>
            <ul>
              <li>Grandi imprese</li>
              <li>Aziende del settore energetico il cui codice ATECO prevalente sia 35.11.00 o 35.14.00 (produzione e vendita di energia elettrica)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>4. Quali Incentivi Sono Disponibili per le CER?</h2>
          <p>Uno dei motivi principali per cui sempre più comunità stanno adottando questo modello è l'accesso agli incentivi economici.</p>

          <h3>4.1 La Tariffa Incentivante</h3>
          <p>Lo Stato riconosce una tariffa incentivante per l'energia prodotta e autoconsumata all'interno della CER. Questo incentivo viene erogato dal GSE (Gestore dei Servizi Energetici) ed è destinato agli impianti di nuova costruzione o a quelli esistenti che vengono potenziati.</p>

          <h3>4.2 Il Contributo a Fondo Perduto del PNRR (Fino al 40%)</h3>
          <p>Grazie al Piano Nazionale di Ripresa e Resilienza (PNRR), le Comunità Energetiche situate nei comuni con meno di 5.000 abitanti possono ricevere un contributo a fondo perduto fino al 40% dei costi di realizzazione degli impianti.</p>

          <div className={styles.highlight}>
            <p>📌 Requisiti per accedere all'incentivo:</p>
            <ul>
              <li>✔️ Il comune in cui si trova la CER deve avere meno di 5.000 abitanti</li>
              <li>✔️ Gli impianti devono avere una potenza massima di 1 MW</li>
              <li>✔️ L'energia prodotta deve essere condivisa tra i membri della CER</li>
              <li>✔️ Gli impianti devono essere connessi alla stessa cabina primaria</li>
            </ul>
          </div>

          <div className={styles.highlight}>
            <p>💰 Budget disponibile: il fondo totale è di 2,2 miliardi di euro, con l'obiettivo di finanziare almeno 2 GW di nuova capacità rinnovabile entro il 30 giugno 2026.</p>
          </div>
        </section>

        <section>
          <h2>5. Come Costituire una Comunità Energetica Rinnovabile?</h2>
          <p>Per creare una CER e accedere agli incentivi, bisogna seguire alcuni passaggi chiave.</p>

          <h3>5.1 Fase 1: Progettazione e Pianificazione</h3>
          <ul>
            <li>🔹 Identificare i membri della CER: è necessario coinvolgere almeno due soggetti tra produttori e consumatori.</li>
            <li>🔹 Definire gli impianti di produzione: scegliere se costruire nuovi impianti o potenziare quelli esistenti.</li>
            <li>🔹 Verificare la cabina primaria: tutti i membri devono essere connessi alla stessa cabina primaria per poter condividere l'energia.</li>
          </ul>

          <div className={styles.highlight}>
            <p>📌 Strumenti utili: il GSE mette a disposizione una mappa interattiva per verificare l'appartenenza alla stessa cabina primaria.</p>
          </div>

          <h3>5.2 Fase 2: Costituzione Giuridica</h3>
          <p>📜 Redazione dello Statuto e Atto Costitutivo</p>
          <ul>
            <li>La CER deve essere un soggetto giuridico autonomo</li>
            <li>Deve indicare chiaramente che lo scopo principale è fornire benefici ambientali e sociali, non il profitto finanziario</li>
          </ul>

          <h3>5.3 Fase 3: Accesso agli Incentivi</h3>
          <p>📝 Documenti richiesti per ottenere il contributo PNRR e la tariffa incentivante:</p>
          <ul>
            <li>✅ Atto costitutivo della CER</li>
            <li>✅ Dati sugli impianti di produzione</li>
            <li>✅ Certificazioni di conformità degli impianti</li>
            <li>✅ Domanda di accesso agli incentivi sul portale del GSE</li>
          </ul>

          <p>Il GSE effettua una valutazione tecnica e, se tutti i requisiti sono soddisfatti, vengono erogati gli incentivi.</p>

          <div className={styles.highlight}>
            <p>⏳ Tempi di approvazione: circa 60 giorni dalla presentazione della domanda.</p>
          </div>
        </section>

        <section>
          <h2>6. Conclusioni: Perché Le CER Sono il Futuro dell'Energia?</h2>
          <p>Le Comunità Energetiche Rinnovabili rappresentano una rivoluzione nel settore energetico, consentendo di:</p>
          <ul>
            <li>✅ Ridurre le bollette e aumentare l'indipendenza energetica</li>
            <li>✅ Abbattere le emissioni di CO₂ e promuovere l'uso di energie pulite</li>
            <li>✅ Creare un sistema energetico più equo e partecipativo</li>
          </ul>
          <p>Con gli incentivi disponibili e le sempre maggiori semplificazioni burocratiche, il momento per entrare nel mondo delle CER è adesso!</p>
        </section>
      </article>

      <button 
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ⬆ Torna all'inizio
      </button>
    </div>
  )
} 