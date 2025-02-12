'use client'

import styles from './HeroCTA.module.css'

export default function HeroCTA() {
  return (
    <div className={styles.hero_cta_container}>
      <div className={styles.whatsapp_section}>
        <a 
          href="https://wa.me/393470087833"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            src="/images/hero/WhatsappButton.png"
            alt="WhatsApp CTA"
            className={styles.whatsapp_cta}
          />
        </a>
      </div>

      <div className={styles.info_text}>
        <p>Compila il form per essere ricontattato</p>
      </div>

      <form 
        className={styles.contact_form}
        action="https://formsubmit.co/info@filyimpianti.it" 
        method="POST"
      >
        <input
          type="text"
          name="contact"
          placeholder="Email o Numero di Telefono"
          required
          autoComplete="on"
          aria-label="Email o numero di telefono"
        />
        <button type="submit" className={styles.cta_button}>
          RICHIEDI INFORMAZIONI
        </button>
      </form>
    </div>
  )
} 