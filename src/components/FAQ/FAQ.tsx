'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Quanto tempo ci vuole per installare un impianto fotovoltaico?",
    answer: "Installiamo il tuo impianto in soli 30 giorni dalla firma del contratto, o lo facciamo GRATIS. La nostra priorità è garantirti rapidità e affidabilità."
  },
  {
    question: "Cosa succede se ho bisogno di assistenza dopo l'installazione?",
    answer: "Siamo al tuo fianco 24/7 con un supporto tecnico rapido e interventi tempestivi. Il nostro obiettivo è mantenere il tuo impianto sempre efficiente."
  },
  {
    question: "Posso ridurre la bolletta elettrica con il fotovoltaico?",
    answer: "Sì! Puoi abbattere fino all'80% dei costi producendo energia direttamente dal sole. La soluzione ideale per risparmiare e proteggerti dai rincari."
  },
  {
    question: "Gestite voi le pratiche burocratiche?",
    answer: "Assolutamente sì! Pensiamo a tutto noi: progettazione, permessi, detrazioni fiscali e connessione alla rete. Tu non dovrai preoccuparti di nulla."
  },
  {
    question: "Quanto durano le garanzie sugli impianti?",
    answer: "Ti offriamo una garanzia estesa di 25 anni su prodotti e manodopera. La tua serenità è importante per noi, oggi e nel futuro."
  },
  {
    question: "Posso usare l'energia anche di notte?",
    answer: "Sì! Grazie ai nostri sistemi di storage, puoi accumulare l'energia prodotta durante il giorno e usarla anche nelle ore serali. Maggiore autonomia, maggiore risparmio!"
  },
  {
    question: "È possibile accedere a incentivi statali?",
    answer: "Certamente! Ti aiutiamo a ottenere tutti gli incentivi disponibili, inclusi quelli per il Conto Termico 3.0 e le detrazioni fiscali. Non lasciarti sfuggire queste opportunità."
  },
  {
    question: "Quale sistema è adatto alle mie esigenze?",
    answer: "Che tu abbia consumi bassi, medi o elevati, abbiamo la configurazione ideale per te. Dal sistema da 3 kWp a 8 kWp, con storage adeguato alle tue necessità."
  },
  {
    question: "Posso integrare il fotovoltaico con altri sistemi?",
    answer: "Sì, offriamo soluzioni integrate con solare termico, climatizzatori, pompe di calore e altro. Massimizza il tuo risparmio e il comfort della tua casa."
  },
  {
    question: "Dove operate e quanto tempo serve per un sopralluogo?",
    answer: "Operiamo in tutta Italia e organizziamo un sopralluogo entro pochi giorni dalla tua richiesta. Il primo passo per risparmiare parte da qui."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.title}>FAQ - Le Domande Più Frequenti</h2>
      <div className={styles.faqGrid}>
        {faqData.map((faq, index) => (
          <div 
            key={index}
            className={styles.faqItem}
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <h3 className={styles.question}>{faq.question}</h3>
            <div className={`${styles.answer} ${openIndex === index ? styles.open : ''}`}>
              <p>{faq.answer}</p>
              <button className={styles.ctaButton}>
                👉 Richiedi Informazioni
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 