'use client'

import styles from './GuaranteeWidget.module.css'

const benefits = [
  {
    icon: '⏱️',
    title: 'Installazione in 30 Giorni',
    description: 'Garantiamo l\'installazione entro 30 giorni dalla firma del contratto, o l\'impianto è gratis! La tua soddisfazione è la nostra priorità assoluta.'
  },
  {
    icon: '🛡️',
    title: 'Garanzia Estesa 25 Anni',
    description: 'Offriamo una delle garanzie più complete del settore. Copriamo prodotti e manodopera per darti la massima serenità nel lungo periodo.'
  },
  {
    icon: '🔧',
    title: 'Assistenza 24/7',
    description: 'Supporto tecnico sempre disponibile, interventi tempestivi e manutenzione programmata. Il tuo impianto sarà sempre al massimo dell\'efficienza.'
  },
  {
    icon: '📋',
    title: 'Pratiche Chiavi in Mano',
    description: 'Gestiamo tutte le pratiche burocratiche, dalla progettazione ai permessi, dalle detrazioni fiscali alla connessione alla rete. Zero pensieri per te!'
  }
]

export interface GuaranteeWidgetProps {
  className?: string;
}

export default function GuaranteeWidget({ className }: GuaranteeWidgetProps) {
  return (
    <section className={`${styles.serviceSection} ${className || ''}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Le Nostre Garanzie Esclusive</h2>
        <p className={styles.subtitle}>Scegli la Tranquillità di un Servizio Completo e Garantito</p>
        
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitItem}>
              <h3>
                <span className={styles.icon}>{benefit.icon}</span>
                {benefit.title}
              </h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 