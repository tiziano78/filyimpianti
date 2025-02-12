'use client'

import { useEffect } from 'react'
import styles from './page.module.css'
import ShareButtons from '@/components/ShareButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faRocket, 
  faLeaf, 
  faSolarPanel,
  faMoneyBillWave,
  faHandshake,
  faTools,
  faBullhorn,
  faLightbulb,
  faEarthEurope,
  faWrench,
  faXmark,
  faChartLine,
  faGear,
  faEnvelope,
  faPhone,
  faHome,
  faCheck,
  faInfoCircle,
  faCircleExclamation,
  faFire,
  faLocationDot,
  faBullseye,
  faTriangleExclamation,
  faBuilding,
  faTemperatureHalf,
  faDroplet,
  faSun,
  faArrowTrendDown,
  faPlugCircleBolt,
  faHouseCircleCheck,
  faShieldHalved,
  faChartSimple,
  faCircleCheck,
  faCircleArrowRight,
  faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons'

export default function ContoTermicoPage() {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Conto Termico 3.0',
        page_path: '/conto-termico'
      })
    }
  }, [])

  const trackContactClick = (method: 'email' | 'phone') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_click', {
        event_category: 'engagement',
        event_label: method
      })
    }
  }

  return (
    <div className={styles.article}>
      <h1>Conto Termico 3.0: La Rivoluzione dell'Efficienza Energetica con FILYIMPIANTI</h1>
      
      <div className={styles.content}>
        <p>Ogni anno, milioni di italiani pagano bollette del gas e della luce sempre più salate. Molti si rassegnano, pensando che un impianto di riscaldamento moderno sia un lusso riservato a pochi.</p>

        <p>Quello che quasi nessuno sa, però, è che grazie al Conto Termico 3.0 puoi sostituire il tuo vecchio impianto con soluzioni all'avanguardia senza dover affrontare spese insostenibili.</p>

        <div className={styles.highlight}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faMoneyBillWave} className={styles.inlineIcon} />
              Fino al 65% di rimborso diretto
            </li>
            <li>
              <FontAwesomeIcon icon={faChartLine} className={styles.inlineIcon} />
              Accredito dell'incentivo in un'unica soluzione in soli 60 giorni
            </li>
            <li>
              <FontAwesomeIcon icon={faHome} className={styles.inlineIcon} />
              Impianti moderni che riducono le bollette fino al 70%
            </li>
          </ul>
        </div>

        <p>
          <FontAwesomeIcon icon={faRocket} className={styles.inlineIcon} />
          E con FILYIMPIANTI non dovrai pensare a nulla: ci occupiamo di tutto, dalla consulenza all'installazione, fino alla gestione della pratica per ottenere il massimo incentivo possibile.
        </p>

        <p>Ma attenzione: non è solo una questione di pompe di calore, biomassa o impianti ibridi. C'è un'innovazione che sta cambiando completamente il riscaldamento domestico.</p>

        <p>Un'alternativa che pochi conoscono ma che rende obsoleti i vecchi sistemi. Tra poco te la svelerò.</p>

        <p>Ma prima, vediamo come funziona il Conto Termico 3.0 e come puoi sfruttarlo al massimo.</p>

        <h2>
          <FontAwesomeIcon icon={faInfoCircle} className={styles.inlineIcon} />
          Cos'è il Conto Termico 3.0 e Perché è un'Occasione da Non Perdere?
        </h2>
        <p>Il Conto Termico 3.0 è un incentivo economico gestito dal GSE (Gestore dei Servizi Energetici) che rimborsa direttamente una parte della spesa sostenuta per migliorare l'efficienza energetica della tua casa o azienda.</p>

        <p>Non è una detrazione fiscale come l'Ecobonus o il Superbonus. Qui i soldi li ricevi direttamente sul conto corrente, senza doverli scalare dalle tasse negli anni.</p>

        <div className={styles.highlight}>
          <h3>
            <FontAwesomeIcon icon={faBullseye} className={styles.inlineIcon} />
            Quanto puoi ottenere?
          </h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
              Fino al 65% della spesa rimborsata
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
              Rimborso in un'unica soluzione (se inferiore a 5.000€) o in 5 rate annuali per importi superiori
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
              Importi più elevati per le zone climatiche più fredde
            </li>
          </ul>
        </div>

        <p>
          <FontAwesomeIcon icon={faLocationDot} className={styles.inlineIcon} />
          E con FILYIMPIANTI, il massimo incentivo è garantito.
        </p>

        <h2>
          <FontAwesomeIcon icon={faBuilding} className={styles.inlineIcon} />
          Chi Può Beneficiare del Conto Termico 3.0?
        </h2>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Privati cittadini e condomini che vogliono migliorare l'efficienza della propria abitazione
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Imprese e Partite IVA che operano in edifici commerciali, produttivi o industriali
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Pubbliche Amministrazioni per la riqualificazione di scuole e uffici pubblici
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            ESCo (Energy Service Company) che realizzano interventi per conto di terzi
          </li>
        </ul>

        <p className={styles.warning}>
          <FontAwesomeIcon icon={faTriangleExclamation} className={styles.inlineIcon} />
          Non è applicabile agli edifici di nuova costruzione.
        </p>

        <h2>
          <FontAwesomeIcon icon={faFire} className={styles.inlineIcon} />
          Quali Impianti Puoi Sostituire con FILYIMPIANTI?
        </h2>
        <p>Se hai un impianto datato, costoso e inefficiente, con il Conto Termico 3.0 puoi sostituirlo con una tecnologia moderna e ad alta efficienza.</p>

        <div className={styles.highlight}>
          <h3>
            <FontAwesomeIcon icon={faTemperatureHalf} className={styles.inlineIcon} />
            Da caldaia a gasolio/GPL/carbone → a pompa di calore
          </h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLightbulb} className={styles.inlineIcon} />
              Risparmio fino al 70% sui consumi
            </li>
            <li>
              <FontAwesomeIcon icon={faMoneyBillWave} className={styles.inlineIcon} />
              Incentivo fino al 65%
            </li>
            <li>
              <FontAwesomeIcon icon={faLeaf} className={styles.inlineIcon} />
              Zero emissioni locali e massimo comfort
            </li>
          </ul>
        </div>

        <div className={styles.highlight}>
          <h3>
            <FontAwesomeIcon icon={faDroplet} className={styles.inlineIcon} />
            Da scaldabagno elettrico → a scaldacqua a pompa di calore
          </h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLightbulb} className={styles.inlineIcon} />
              Consumi ridotti del 75%
            </li>
            <li>
              <FontAwesomeIcon icon={faMoneyBillWave} className={styles.inlineIcon} />
              Fino al 50% di incentivo
            </li>
            <li>
              <FontAwesomeIcon icon={faLeaf} className={styles.inlineIcon} />
              Zero gas, solo energia pulita
            </li>
          </ul>
        </div>

        <div className={styles.highlight}>
          <h3>
            <FontAwesomeIcon icon={faSun} className={styles.inlineIcon} />
            Da impianto senza pannelli solari → a pannelli solari termici
          </h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLightbulb} className={styles.inlineIcon} />
              Acqua calda gratuita grazie all'energia solare
            </li>
            <li>
              <FontAwesomeIcon icon={faMoneyBillWave} className={styles.inlineIcon} />
              Incentivo fino al 65%
            </li>
            <li>
              <FontAwesomeIcon icon={faLeaf} className={styles.inlineIcon} />
              Perfetta integrazione con impianti di riscaldamento moderni
            </li>
          </ul>
        </div>

        <p>
          <FontAwesomeIcon icon={faPhone} className={styles.inlineIcon} />
          FILYIMPIANTI analizza il tuo impianto e ti propone la soluzione ideale per ottenere il massimo risparmio.
        </p>

        <h2>
          <FontAwesomeIcon icon={faWandMagicSparkles} className={styles.inlineIcon} />
          La Nuova Frontiera del Riscaldamento: I Pannelli Endotermici
        </h2>

        <p>Finora abbiamo parlato delle soluzioni già conosciute. Ma c'è qualcosa di ancora più innovativo.</p>

        <p>Un sistema di riscaldamento che non ha bisogno di caldaie, combustibili o manutenzione.</p>

        <p>Si tratta dei pannelli endotermici.</p>

        <h2>
          <FontAwesomeIcon icon={faPlugCircleBolt} className={styles.inlineIcon} />
          Cosa Sono i Pannelli Endotermici?
        </h2>

        <p>I pannelli endotermici rappresentano una rivoluzione tecnologica. Sono dispositivi sottilissimi, discreti ed efficientissimi che trasformano l'energia elettrica in calore con un rendimento straordinario.</p>

        <ul>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.inlineIcon} />
            Riscaldamento uniforme e senza sprechi
          </li>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.inlineIcon} />
            Zero manutenzione, zero combustibili, zero tubature
          </li>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.inlineIcon} />
            Silenziosi, invisibili e completamente integrabili nell'arredamento
          </li>
          <li>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.inlineIcon} />
            Perfetti in combinazione con fotovoltaico e batterie di accumulo
          </li>
        </ul>

        <p>
          <FontAwesomeIcon icon={faCircleArrowRight} className={styles.inlineIcon} />
          Immagina di riscaldare la tua casa senza una caldaia, senza gas, senza tubi. FILYIMPIANTI può trasformare questa visione in realtà.
        </p>

        <h2>
          <FontAwesomeIcon icon={faEarthEurope} className={styles.inlineIcon} />
          Quanto Puoi Risparmiare? La Differenza tra le Zone Climatiche
        </h2>
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

        <p>
          <FontAwesomeIcon icon={faLocationDot} className={styles.inlineIcon} />
          FILYIMPIANTI ti aiuta a calcolare il massimo incentivo disponibile per la tua zona.
        </p>

        <h2>
          <FontAwesomeIcon icon={faMoneyBillWave} className={styles.inlineIcon} />
          Come Accedere al Conto Termico 3.0 con FILYIMPIANTI?
        </h2>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Consulenza gratuita per individuare l'intervento più conveniente
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Installazione certificata da tecnici specializzati
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Gestione completa della pratica per ottenere l'incentivo
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Rimborso diretto sul tuo conto corrente entro 60 giorni
          </li>
        </ul>

        <h2>
          <FontAwesomeIcon icon={faWrench} className={styles.inlineIcon} />
          Perché Scegliere FILYIMPIANTI?
        </h2>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Soluzioni su misura per la tua casa
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Esperienza e affidabilità per il massimo incentivo garantito
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Installazione rapida, sicura e certificata
          </li>
          <li>
            <FontAwesomeIcon icon={faCheck} className={styles.inlineIcon} />
            Tecnologie all'avanguardia, inclusi i rivoluzionari pannelli endotermici
          </li>
        </ul>

        <div className={styles.cta}>
          <h3>
            <FontAwesomeIcon icon={faPhone} className={styles.inlineIcon} />
            Non perdere questa opportunità!
          </h3>
          <p>Contattaci per una consulenza gratuita e scopri quanto puoi risparmiare.</p>
          <div className={styles.contactInfo}>
            <a href="mailto:info@filyimpianti.it" onClick={() => trackContactClick('email')}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.inlineIcon} />
              info@filyimpianti.it
            </a>
            <a href="tel:+393470087833" onClick={() => trackContactClick('phone')}>
              <FontAwesomeIcon icon={faPhone} className={styles.inlineIcon} />
              347 008 7833
            </a>
          </div>
        </div>

        <p className={styles.closing}>
          <FontAwesomeIcon icon={faLeaf} className={styles.inlineIcon} />
          Il futuro del riscaldamento è qui. Scoprilo con FILYIMPIANTI.
          <FontAwesomeIcon icon={faRocket} className={styles.inlineIcon} />
        </p>
        
        <ShareButtons 
          url="https://www.filyimpianti.it/conto-termico"
          title="Conto Termico 3.0: La Rivoluzione dell'Efficienza Energetica con FILYIMPIANTI"
        />
      </div>
    </div>
  )
} 