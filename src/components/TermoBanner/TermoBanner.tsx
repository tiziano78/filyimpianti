'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './TermoBanner.module.css'
import clsx from 'clsx'
import InfoFormPopup from '@/components/forms/InfoFormPopup/InfoFormPopup'
import ConfigButton from '@/components/AlternatingBanner/ConfigButton/ConfigButton'

const termoBannerSections = [
  {
    image: '/images/banner.termo/1-kit pannelli fotovoltaici+solare termico.webp',
    imageAlt: 'Kit pannelli fotovoltaici con solare termico',
    title: 'FOTOVOLTAICO + SOLARE TERMICO LA COMBINAZIONE PERFETTA:',
    description: 'Il sistema integrato fotovoltaico con solare termico rappresenta la soluzione ottimale per chi desidera massimizzare l\'efficienza energetica della propria casa.',
    benefits: [
      'Doppio Risparmio: Produci energia elettrica e acqua calda gratuitamente',
      'Alta Efficienza: Massimo rendimento in ogni stagione',
      'Eco-sostenibile: Riduci drasticamente le emissioni di CO2'
    ],
    isReversed: false
  },
  {
    image: '/images/banner.termo/2-kit pannelli fotovoltaici+condizionatore.webp',
    imageAlt: 'Sistema fotovoltaico con climatizzazione',
    title: 'FOTOVOLTAICO + CLIMATIZZATORE, COMFORT TUTTO L\'ANNO:',
    description: 'La perfetta integrazione tra fotovoltaico e climatizzazione per un comfort ottimale in tutte le stagioni.',
    benefits: [
      'Climatizzazione Gratuita: Utilizza l\'energia solare per il condizionamento',
      'Comfort Garantito: Temperatura ideale estate e inverno',
      'Risparmio Energetico: Riduci i costi di climatizzazione'
    ],
    isReversed: true
  },
  {
    image: '/images/banner.termo/3-kit pannelli fotovoltaici+pompa di calore.webp',
    imageAlt: 'Sistema fotovoltaico con pompa di calore',
    title: 'FOTOVOLTAICO + POMPA DI CALORE, EFFICIENZA MASSIMA:',
    description: 'Un sistema all-in-one che garantisce massima efficienza per riscaldamento, raffrescamento e acqua calda.',
    benefits: [
      'Versatilità: Un unico sistema per tutte le esigenze',
      'Efficienza Superiore: COP elevato per massimi risparmi',
      'Zero Emissioni: Sistema completamente ecologico'
    ],
    isReversed: false
  },
  {
    image: '/images/banner.termo/4-kit pannelli fotovoltaici+caldaia a legna.webp',
    imageAlt: 'Sistema integrato completo',
    title: 'FOTOVOLTAICO + CALDAIA A LEGNA, AUTONOMIA COMPLETA:',
    description: 'La combinazione ideale per chi cerca la massima indipendenza energetica con fonti rinnovabili.',
    benefits: [
      'Autonomia Totale: Indipendenza dalla rete elettrica e gas',
      'Doppia Fonte: Energia solare e biomassa sempre disponibili',
      'Massimo Risparmio: Elimina completamente i costi energetici'
    ],
    isReversed: true
  }
]

export default function TermoBanner() {
  return (
    <div className={styles.bannerWrapper}>
      {termoBannerSections.map((section, index) => (
        <section key={index} className={styles.contentSection}>
          <div className={`${styles.contentContainer} ${section.isReversed ? styles.reversed : ''}`}>
            <div className={styles.imageSide}>
              <Image
                src="/images/banner.termo/1-kit pannelli fotovoltaici+solare termico.webp"
                alt="Kit pannelli fotovoltaici e solare termico"
                width={500}
                height={300}
                style={{ 
                  width: '100%',
                  height: 'auto',
                  maxWidth: '500px',
                  aspectRatio: '5/3'
                }}
              />
              <div className={styles.buttonGroup}>
                <InfoFormPopup />
                <ConfigButton />
              </div>
            </div>
            <div className={styles.textSide}>
              <h4>{section.title}</h4>
              <p>{section.description}</p>
              <div className={styles.benefits}>
                <p><strong>⚡PERCHE' SCEGLIERE QUESTO SISTEMA?</strong></p>
                {section.benefits.map((benefit, idx) => (
                  <p key={idx}><strong>⚡{benefit}</strong></p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
} 