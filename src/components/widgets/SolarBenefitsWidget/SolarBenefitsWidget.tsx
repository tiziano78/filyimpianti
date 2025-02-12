'use client'

import styles from './SolarBenefitsWidget.module.css'

const solarBenefits = [
  {
    icon: '☀️',
    title: 'Energia Pulita',
    description: 'Produci energia 100% rinnovabile dal sole, riducendo l\'impatto ambientale e le emissioni di CO2.'
  },
  {
    icon: '💶',
    title: 'Risparmio Garantito',
    description: 'Abbatti fino all\'80% i costi della bolletta elettrica e proteggi il tuo budget dai rincari energetici.'
  },
  {
    icon: '🏠',
    title: 'Valore Immobile',
    description: 'Aumenta il valore della tua proprietà e migliora la sua classe energetica con un impianto di qualità.'
  },
  {
    icon: '🔋',
    title: 'Indipendenza',
    description: 'Diventa autonomo energeticamente e proteggi la tua famiglia dai blackout con sistemi di accumulo.'
  }
]

export interface SolarBenefitsWidgetProps {
  className?: string;
}

export default function SolarBenefitsWidget({ className }: SolarBenefitsWidgetProps) {
  return (
    <section className={`${styles.serviceSection} ${className || ''}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Vantaggi del Fotovoltaico</h2>
        <p className={styles.subtitle}>Scopri Perché Scegliere l'Energia Solare per la Tua Casa</p>
        
        <div className={styles.benefitsGrid}>
          {solarBenefits.map((benefit, index) => (
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