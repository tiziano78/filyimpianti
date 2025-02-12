'use client'

import { useState } from 'react'
import styles from './ConfigSelector.module.css'

interface ConfigOption {
  id: string
  name: string
  description: string
  specs?: {
    [key: string]: string | number
  }
}

interface ConfigSelectorProps {
  title: string
  options: ConfigOption[]
  selectedId?: string
  onSelectAction: (id: string) => void
}

export default function ConfigSelector({ 
  title, 
  options, 
  selectedId, 
  onSelectAction 
}: ConfigSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={styles.selector}>
      <div 
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className={styles.title}>{title}</h4>
        <button className={`${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}>
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M6 9L1 4h10L6 9z" 
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className={styles.optionsList}>
          {options.map((option) => (
            <div
              key={option.id}
              className={`${styles.option} ${selectedId === option.id ? styles.selected : ''}`}
              onClick={() => onSelectAction(option.id)}
            >
              <div className={styles.optionHeader}>
                <h5 className={styles.optionName}>{option.name}</h5>
                <div className={styles.optionIndicator} />
              </div>
              <p className={styles.optionDescription}>{option.description}</p>
              {option.specs && (
                <div className={styles.specs}>
                  {Object.entries(option.specs).map(([key, value]) => (
                    <div key={key} className={styles.spec}>
                      <span className={styles.specLabel}>{key}:</span>
                      <span className={styles.specValue}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
