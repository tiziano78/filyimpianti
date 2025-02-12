'use client'

import { useEffect } from 'react'
import styles from './page.module.css'
import ShareButtons from '@/components/ShareButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
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
  faCheck,
  faInfoCircle,
  faUsers,
  faPlug,
  faShieldHalved,
  faArrowsRotate,
  faChartPie,
  faListCheck,
  faCircleCheck,
  faCircleArrowRight,
  faWandMagicSparkles,
  faRecycle,
  faCity,
  faIndustry,
  faGraduationCap,
  faArrowTrendUp,
  faHandHoldingDollar,
  faPeopleGroup,
  faBuilding,
  faCircleNodes,
  faCloudSun,
  faPlugCircleBolt,
  faTreeCity
} from '@fortawesome/free-solid-svg-icons'

export default function CERPage() {
  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Comunità Energetiche Rinnovabili (CER)',
        page_path: '/cer'
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
      <h1>Comunità Energetiche Rinnovabili (CER): Il Futuro dell'Energia Condivisa</h1>
      
      <div className={styles.content}>
        <p>Immagina un mondo in cui l'energia viene prodotta, condivisa e consumata a livello locale. Dove il sole che illumina il tetto di casa tua può alimentare anche l'abitazione del vicino. Dove aziende, comuni e cittadini si uniscono per ridurre i costi energetici e l'impatto ambientale.</p>

        <p>Questo mondo non è un sogno lontano, ma una realtà che sta prendendo piede grazie alle Comunità Energetiche Rinnovabili (CER).</p>

        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faTools} className={styles.inlineIcon} />
            Grazie all'impegno di aziende specializzate come FILYIMPIANTI, oggi è possibile creare e gestire Comunità Energetiche in modo efficiente e innovativo, ottimizzando ogni fase: dalla progettazione degli impianti alla manutenzione, fino all'accesso agli incentivi statali.
          </p>
        </div>

        <p>Ma cosa sono esattamente le CER? E come possono cambiare il nostro rapporto con l'energia? Scopriamolo insieme in questo approfondimento.</p>

        <h2>1. Cosa Sono le Comunità Energetiche Rinnovabili?</h2>
        <p>Le CER sono associazioni di cittadini, aziende, enti pubblici e privati che collaborano per produrre e condividere energia da fonti rinnovabili. In pratica, si tratta di un modello che democratizza l'energia, trasformando ogni membro della comunità in produttore e consumatore (prosumers).</p>

        <h3>1.1 Come Funzionano?</h3>
        <p>Il concetto è semplice:</p>
        <ul>
          <li>
            <FontAwesomeIcon icon={faSolarPanel} className={styles.inlineIcon} />
            Un gruppo di persone o enti si organizza per produrre energia da fonti rinnovabili
          </li>
          <li>
            <FontAwesomeIcon icon={faArrowsRotate} className={styles.inlineIcon} />
            L'energia viene immessa nella rete locale e condivisa tra i membri della comunità
          </li>
          <li>
            <FontAwesomeIcon icon={faMoneyBillWave} className={styles.inlineIcon} />
            Chi consuma questa energia beneficia di tariffe più vantaggiose e incentivi economici
          </li>
          <li>
            <FontAwesomeIcon icon={faChartPie} className={styles.inlineIcon} />
            Il surplus energetico può essere venduto o accumulato per un uso successivo
          </li>
        </ul>

        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faTools} className={styles.inlineIcon} />
            Ma affinché tutto funzioni in modo ottimale, è necessario affidarsi a esperti del settore, come FILYIMPIANTI, un'azienda che si occupa dell'installazione, manutenzione e ottimizzazione degli impianti di energia rinnovabile, garantendo massima efficienza e conformità normativa.
          </p>
        </div>

        <h3>1.2 Un'Energia a Misura di Comunità</h3>
        <p>A differenza delle grandi centrali elettriche, che distribuiscono energia su lunghe distanze, le CER promuovono un modello più sostenibile e decentralizzato. Questo riduce le dispersioni di energia e favorisce l'autonomia energetica delle comunità locali.</p>

        <p className={styles.warning}>
          <FontAwesomeIcon icon={faRocket} className={styles.inlineIcon} />
          In breve: meno dipendenza dai colossi dell'energia, più controllo e risparmio per i cittadini!
        </p>

        <h2>2. Perché le CER Sono un'Opportunità per Tutti?</h2>
        <p>Ora che abbiamo capito il funzionamento, vediamo perché vale la pena farne parte.</p>

        <h3>
          <FontAwesomeIcon icon={faLeaf} className={styles.inlineIcon} />
          2.1 Benefici Ambientali
        </h3>
        <ul>
          <li>
            <FontAwesomeIcon icon={faRecycle} className={styles.inlineIcon} />
            Riduzione delle emissioni di CO₂: meno energia da combustibili fossili, più energia pulita
          </li>
          <li>
            <FontAwesomeIcon icon={faTreeCity} className={styles.inlineIcon} />
            Minore impatto ambientale: energia prodotta localmente significa meno infrastrutture inquinanti
          </li>
          <li>
            <FontAwesomeIcon icon={faCloudSun} className={styles.inlineIcon} />
            Promozione della sostenibilità: un passo concreto verso la transizione ecologica
          </li>
        </ul>

        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faWandMagicSparkles} className={styles.inlineIcon} />
            Grazie a soluzioni tecnologiche avanzate fornite da FILYIMPIANTI, ogni CER può massimizzare la propria efficienza energetica, adottando sistemi di monitoraggio intelligenti che ottimizzano il consumo e la produzione.
          </p>
        </div>

        <h3>
          <FontAwesomeIcon icon={faHandHoldingDollar} className={styles.inlineIcon} />
          2.2 Benefici Economici
        </h3>
        <ul>
          <li>
            <FontAwesomeIcon icon={faArrowTrendUp} className={styles.inlineIcon} />
            Bollette più basse: i membri della CER accedono a tariffe vantaggiose
          </li>
          <li>
            <FontAwesomeIcon icon={faMoneyBillWave} className={styles.inlineIcon} />
            Incentivi statali: grazie al PNRR e alle agevolazioni del GSE, si possono ottenere contributi a fondo perduto
          </li>
          <li>
            <FontAwesomeIcon icon={faShieldHalved} className={styles.inlineIcon} />
            Indipendenza energetica: meno vulnerabilità alle fluttuazioni dei prezzi dell'energia
          </li>
        </ul>

        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.inlineIcon} />
            FILYIMPIANTI aiuta le CER ad accedere a questi incentivi, occupandosi della progettazione impiantistica, della burocrazia e della gestione degli incentivi statali, rendendo tutto più semplice per aziende e privati.
          </p>
        </div>

        <h3>
          <FontAwesomeIcon icon={faPeopleGroup} className={styles.inlineIcon} />
          2.3 Benefici Sociali
        </h3>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCircleNodes} className={styles.inlineIcon} />
            Coinvolgimento della comunità: le CER rafforzano i legami tra cittadini, aziende ed enti locali
          </li>
          <li>
            <FontAwesomeIcon icon={faIndustry} className={styles.inlineIcon} />
            Nuove opportunità di lavoro: installazione e gestione degli impianti creano occupazione locale
          </li>
          <li>
            <FontAwesomeIcon icon={faGraduationCap} className={styles.inlineIcon} />
            Innovazione e digitalizzazione: le CER promuovono l'uso di tecnologie avanzate per la gestione dell'energia
          </li>
        </ul>

        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faCircleArrowRight} className={styles.inlineIcon} />
            FILYIMPIANTI fornisce consulenza specializzata alle comunità che vogliono entrare nel mondo delle CER, offrendo soluzioni su misura per ogni esigenza.
          </p>
        </div>

        <h2>3. Come Costituire una Comunità Energetica Rinnovabile?</h2>
        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faTools} className={styles.inlineIcon} />
            FILYIMPIANTI affianca i clienti in tutte le fasi, dalla scelta delle tecnologie più adatte fino alla realizzazione degli impianti e alla gestione operativa della comunità.
          </p>
        </div>

        <h2>4. Incentivi e Finanziamenti: Cosa C'è da Sapere?</h2>
        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faBullhorn} className={styles.inlineIcon} />
            Se vuoi costituire una CER, affidarti a FILYIMPIANTI significa avere un partner che ti guida passo dopo passo, garantendoti accesso a tutti i finanziamenti disponibili e supporto nella gestione della comunità.
          </p>
        </div>

        <h2>5. Le Sfide delle CER: Cosa Resta da Migliorare?</h2>
        <p>Anche se le CER sono una grande opportunità, ci sono ancora alcune sfide da superare:</p>
        <ul>
          <li>
            <FontAwesomeIcon icon={faXmark} className={styles.inlineIcon} />
            Burocrazia complessa
          </li>
          <li>
            <FontAwesomeIcon icon={faXmark} className={styles.inlineIcon} />
            Difficoltà di accesso ai finanziamenti
          </li>
          <li>
            <FontAwesomeIcon icon={faXmark} className={styles.inlineIcon} />
            Limitazioni tecniche
          </li>
        </ul>

        <div className={styles.highlight}>
          <p>
            <FontAwesomeIcon icon={faCircleCheck} className={styles.inlineIcon} />
            FILYIMPIANTI lavora proprio per semplificare questi aspetti, offrendo supporto tecnico, amministrativo e finanziario per far sì che ogni CER possa nascere e svilupparsi con successo.
          </p>
        </div>

        <h2>6. Il Futuro delle Comunità Energetiche Rinnovabili</h2>
        <p>
          <FontAwesomeIcon icon={faEarthEurope} className={styles.inlineIcon} />
          Le CER non sono solo un'innovazione energetica, ma un cambiamento culturale.
        </p>

        <p>Sempre più cittadini e aziende stanno abbracciando questa filosofia per ridurre i costi, migliorare l'ambiente e creare comunità più resilienti.</p>

        <div className={styles.cta}>
          <h3>
            <FontAwesomeIcon icon={faLightbulb} className={styles.inlineIcon} />
            Vuoi creare una CER o aderire a una esistente? Contatta FILYIMPIANTI!
          </h3>
          
          <div className={styles.contactInfo}>
            <a href="tel:+393470087833" onClick={() => trackContactClick('phone')}>
              <FontAwesomeIcon icon={faPhone} className={styles.inlineIcon} />
              Chiama ora per una consulenza gratuita
            </a>
            <a href="mailto:info@filyimpianti.it" onClick={() => trackContactClick('email')}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.inlineIcon} />
              Scrivi per maggiori informazioni
            </a>
          </div>
        </div>

        <div className={styles.closing}>
          <p>
            <FontAwesomeIcon icon={faLightbulb} className={styles.inlineIcon} />
            Unisciti alla rivoluzione energetica. Con FILYIMPIANTI, il futuro è più verde! 
            <FontAwesomeIcon icon={faLeaf} className={styles.inlineIcon} />
            <FontAwesomeIcon icon={faPlugCircleBolt} className={styles.inlineIcon} />
          </p>
        </div>

        <ShareButtons 
          url="https://www.filyimpianti.it/cer"
          title="Comunità Energetiche Rinnovabili (CER): Il Futuro dell'Energia Condivisa"
        />
      </div>
    </div>
  )
} 