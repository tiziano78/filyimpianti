'use client'

import styles from './HeroTestimonialContainer.module.css'

interface HeroTestimonialContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function HeroTestimonialContainer({ 
    children, 
    className 
}: HeroTestimonialContainerProps) {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            <div className={styles.inner}>
                {children}
            </div>
        </div>
    )
} 