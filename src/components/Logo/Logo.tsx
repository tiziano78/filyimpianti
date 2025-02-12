import Link from 'next/link'
import Image from 'next/image'
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <Image 
          src="/images/logo.png"
          alt="Logo"
          width={70}
          height={50}
          priority
          style={{ 
            width: 'auto',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </Link>
    </div>
  )
} 