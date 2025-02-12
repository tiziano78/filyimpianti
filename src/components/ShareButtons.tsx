import styles from './ShareButtons.module.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFacebookF, 
  faTwitter, 
  faLinkedinIn, 
  faWhatsapp, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons'

interface ShareButtonsProps {
  url: string
  title: string
}

// Aggiungo type guard per verificare l'esistenza di gtag
const isGtagDefined = (): boolean => {
  return typeof window !== 'undefined' && 
         'gtag' in window && 
         typeof (window as any).gtag === 'function'
}

// Funzione sicura per chiamare gtag
const safeGtag = (event: string, action: string, params: object) => {
  if (isGtagDefined()) {
    (window as any).gtag(event, action, params)
  }
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [showCopied, setShowCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${url}\n\n#filyimpianti #energia #sostenibilità #risparmioenergetico`)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
      
      safeGtag('event', 'share', {
        method: 'instagram',
        content_type: 'article',
        content_id: url
      })
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: faFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877f2'
    },
    {
      name: 'Twitter',
      icon: faTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#1da1f2'
    },
    {
      name: 'LinkedIn',
      icon: faLinkedinIn,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: '#0a66c2'
    },
    {
      name: 'WhatsApp',
      icon: faWhatsapp,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: '#25d366'
    },
    {
      name: 'Instagram',
      icon: faInstagram,
      onClick: handleInstagramShare,
      color: '#e4405f'
    }
  ]

  return (
    <div className={styles.shareButtons}>
      <p className={styles.shareText}>Condividi questo articolo:</p>
      <div className={styles.buttons}>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            style={{ '--brand-color': link.color } as React.CSSProperties}
            aria-label={`Condividi su ${link.name}`}
            onClick={(e) => {
              if (link.onClick) {
                e.preventDefault()
                link.onClick()
              } else {
                safeGtag('event', 'share', {
                  method: link.name.toLowerCase(),
                  content_type: 'article',
                  content_id: url
                })
              }
            }}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={link.icon} />
            </span>
            <span className={styles.name}>{link.name}</span>
          </a>
        ))}
      </div>
      {showCopied && (
        <div className={styles.tooltip}>
          Testo copiato! Ora puoi condividerlo su Instagram
        </div>
      )}
    </div>
  )
} 