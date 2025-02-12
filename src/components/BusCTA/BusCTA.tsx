'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { motion } from 'framer-motion'
import styles from './BusCTA.module.css'

export default function BusCTA() {
  return (
    <motion.div 
      className={styles.hero_cta_container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.title}>Contattaci Ora</h2>
      
      <div className={styles.cta_options}>
        <motion.a 
          href="https://wa.me/393470087833"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsapp_button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWhatsapp className={styles.whatsapp_icon} />
          <span>Chatta con noi</span>
        </motion.a>

        <div className={styles.divider}>
          <span>oppure</span>
        </div>

        <motion.form 
          className={styles.contact_form}
          action="https://formsubmit.co/info@filyimpianti.it" 
          method="POST"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.input_container}>
            <HiOutlineMail className={styles.mail_icon} />
            <input
              type="text"
              name="contact"
              placeholder="Email o Telefono"
              required
              autoComplete="on"
              aria-label="Email o numero di telefono"
            />
          </div>
          
          <motion.button 
            type="submit" 
            className={styles.cta_button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Richiedi Preventivo Gratuito
          </motion.button>
        </motion.form>
      </div>
      
      <p className={styles.guarantee}>
        ✓ Risposta entro 24h
      </p>
    </motion.div>
  )
} 