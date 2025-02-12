'use client'

import { useState } from 'react'
import styles from './Footer.module.css'
import PolicyModal from '@/components/modals/PolicyModal/PolicyModal'

export default function Footer() {
  const [policyType, setPolicyType] = useState<'cookie' | 'privacy' | 'terms' | null>(null)

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.companyInfo}>
          <span>Fily Impianti</span>
          <span className={styles.separator}>|</span>
          <span>Via San Baudolino 9, 15121 Alessandria (AL)</span>
          <span className={styles.separator}>|</span>
          <span>P.IVA: 02496320066</span>
          <span className={styles.separator}>|</span>
          <span>C.F.: FCHNNN69P14C353G</span>
          <span className={styles.separator}>|</span>
          <span>PEC: filyimpianti@pec.it</span>
        </div>
        <div className={styles.legalLinks}>
          <button 
            onClick={() => setPolicyType('privacy')}
            className={styles.legalLink}
          >
            Privacy Policy
          </button>
          <span className={styles.separator}>|</span>
          <button 
            onClick={() => setPolicyType('cookie')}
            className={styles.legalLink}
          >
            Cookie Policy
          </button>
          <span className={styles.separator}>|</span>
          <button 
            onClick={() => setPolicyType('terms')}
            className={styles.legalLink}
          >
            Termini e Condizioni
          </button>
        </div>
      </div>

      <PolicyModal 
        isOpen={policyType !== null}
        onCloseAction={() => setPolicyType(null)}
        type={policyType || 'cookie'}
      />
    </footer>
  )
}