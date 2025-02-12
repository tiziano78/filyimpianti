import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.css'

export const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        src="/images/logo.png"
        alt="Filyimpianti Logo"
        width={70}
        height={50}
        priority
        loading="eager"
        fetchPriority="high"
        className={styles.logo__image}
        sizes="(max-width: 768px) 50px, 70px"
      />
    </Link>
  )
}