'use client'

import { useState } from 'react'
import styles from './PolicyModal.module.css'

interface PolicyModalProps {
  isOpen: boolean
  onCloseAction: () => void
  type: 'cookie' | 'privacy' | 'terms'
}

export default function PolicyModal({ isOpen, onCloseAction, type }: PolicyModalProps) {
  const [currentType, setCurrentType] = useState(type)

  const switchPolicy = (newType: 'cookie' | 'privacy' | 'terms') => {
    setCurrentType(newType)
  }

  if (!isOpen) return null

  return (
    <div 
      className={`${styles.policyModal} ${isOpen ? styles.displayBlock : ''}`}
      onClick={onCloseAction}
    >
      <div 
        className={styles.policyContent}
        onClick={e => e.stopPropagation()}
      >
        <button 
          className={styles.policyClose}
          onClick={onCloseAction}
        >
          &times;
        </button>

        <div className={styles.policyNav}>
          <button 
            className={`${styles.policyNavButton} ${currentType === 'cookie' ? styles.active : ''}`}
            onClick={() => switchPolicy('cookie')}
          >
            Cookie Policy
          </button>
          <button 
            className={`${styles.policyNavButton} ${currentType === 'privacy' ? styles.active : ''}`}
            onClick={() => switchPolicy('privacy')}
          >
            Privacy Policy
          </button>
          <button 
            className={`${styles.policyNavButton} ${currentType === 'terms' ? styles.active : ''}`}
            onClick={() => switchPolicy('terms')}
          >
            Terms of Service
          </button>
        </div>

        <div className={styles.policyText}>
          {currentType === 'cookie' ? (
            <>
              <h2>Cookie Policy</h2>
              <h3>Cosa sono i cookie?</h3>
              <p>I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva.</p>

              <h3>Cookie utilizzati da questo sito</h3>
              <h4>Cookie tecnici necessari (durata: sessione)</h4>
              <p>Questi cookie sono essenziali per il corretto funzionamento del sito. Non possono essere disattivati nei nostri sistemi. Vengono eliminati alla chiusura del browser.</p>

              <h4>Cookie analitici (durata: 12 mesi)</h4>
              <p>Ci aiutano a capire come gli utenti interagiscono con il nostro sito raccogliendo e trasmettendo informazioni in forma anonima.</p>

              <h4>Cookie analitici (Google Analytics)</h4>
              <p>Utilizziamo Google Analytics per raccogliere statistiche anonime sull'utilizzo del sito. 
                 I dati sono trattati in forma aggregata e non permettono di identificare il singolo utente.</p>
              <p>I dati raccolti includono:</p>
              <ul>
                <li>Pagine visitate e tempo di permanenza</li>
                <li>Dispositivo e browser utilizzati</li>
                <li>Paese di provenienza (in forma anonima)</li>
              </ul>
              <p>I dati sono conservati sui server di Google per 14 mesi e trattati secondo la loro 
                 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>

              <h3>Conservazione dei dati</h3>
              <ul>
                <li>Cookie di sessione: vengono eliminati alla chiusura del browser</li>
                <li>Cookie analitici: conservati per 12 mesi dalla data di installazione</li>
                <li>Cookie tecnici persistenti: conservati per 24 mesi</li>
              </ul>

              <h4>Google Maps</h4>
              <p>Utilizziamo Google Maps per mostrare la nostra sede. Il servizio potrebbe utilizzare cookie tecnici per:</p>
              <ul>
                <li>Visualizzazione della mappa</li>
                <li>Interazioni con la mappa</li>
                <li>Calcolo percorsi</li>
              </ul>
              <p>I dati sono gestiti da Google secondo la loro 
                 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>
            </>
          ) : currentType === 'privacy' ? (
            <>
              <h2>Privacy Policy</h2>
              <h3>Titolare del Trattamento dei Dati</h3>
              <p>
                Fily Impianti<br/>
                Via San Baudolino 9, 15121 Alessandria (AL)<br/>
                P.IVA: 02496320066<br/>
                PEC: filyimpianti@pec.it
              </p>

              <h3>Tipologie di Dati raccolti e tempi di conservazione</h3>
              <ul>
                <li>Cookie e Dati di utilizzo (12-24 mesi)</li>
                <li>Nome, Email e Telefono dai form di contatto (36 mesi)</li>
                <li>Dati di navigazione come IP e orari (6 mesi)</li>
              </ul>

              <h3>Base giuridica del trattamento</h3>
              <p>Il trattamento dei dati si basa su:</p>
              <ul>
                <li>Consenso dell'utente</li>
                <li>Legittimo interesse del titolare</li>
                <li>Adempimento di obblighi contrattuali</li>
                <li>Obblighi di legge</li>
              </ul>

              <h3>I tuoi diritti (GDPR)</h3>
              <p>Hai il diritto di:</p>
              <ul>
                <li><strong>Accesso:</strong> ottenere conferma del trattamento e copia dei tuoi dati</li>
                <li><strong>Rettifica:</strong> correggere o aggiornare i tuoi dati</li>
                <li><strong>Cancellazione:</strong> richiedere la rimozione dei tuoi dati ("diritto all'oblio")</li>
                <li><strong>Limitazione:</strong> limitare il trattamento dei tuoi dati</li>
                <li><strong>Portabilità:</strong> ricevere i tuoi dati in formato strutturato</li>
                <li><strong>Opposizione:</strong> opporti al trattamento dei tuoi dati</li>
                <li><strong>Revoca del consenso:</strong> revocare i consensi precedentemente forniti</li>
              </ul>

              <h3>Come esercitare i tuoi diritti</h3>
              <p>Puoi esercitare i tuoi diritti contattando il Titolare:</p>
              <ul>
                <li>PEC: filyimpianti@pec.it</li>
                <li>Posta: Via San Baudolino 9, 15121 Alessandria (AL)</li>
                <li>Risponderemo entro 30 giorni dalla richiesta</li>
              </ul>

              <h3>Reclami</h3>
              <p>Hai il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali:</p>
              <ul>
                <li>www.garanteprivacy.it</li>
                <li>Piazza Venezia 11 - 00187 Roma</li>
              </ul>

              <h3>Trasferimento dati extra-UE</h3>
              <p>Alcuni dei servizi utilizzati potrebbero trasferire i dati in paesi extra-UE:</p>
              <ul>
                <li><strong>Google Analytics:</strong> I dati sono trasferiti negli USA con garanzie adeguate:
                  <ul>
                    <li>Clausole Contrattuali Standard approvate dalla Commissione Europea</li>
                    <li>Anonimizzazione degli IP prima del trasferimento</li>
                    <li>Conservazione limitata a 14 mesi</li>
                  </ul>
                </li>
              </ul>

              <h3>Misure di Sicurezza</h3>
              <p>Adottiamo le seguenti misure per proteggere i tuoi dati:</p>
              <ul>
                <li>Connessione HTTPS cifrata</li>
                <li>Protezione CSRF sui form</li>
                <li>Conservazione sicura dei consensi</li>
                <li>Accesso limitato ai dati personali</li>
              </ul>
            </>
          ) : (
            <>
              <h2>Terms of Service</h2>
              <p>Terms of Service content will be added here.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 