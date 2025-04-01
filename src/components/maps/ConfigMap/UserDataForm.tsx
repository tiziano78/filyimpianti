import React, { useState } from 'react';
import styles from './UserDataForm.module.css';

interface UserDataFormProps {
  onSubmit: (userData: { name: string; surname: string; phone: string }) => void;
  onCancel: () => void;
}

const UserDataForm: React.FC<UserDataFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; surname?: string; phone?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; surname?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    
    if (!surname.trim()) {
      newErrors.surname = 'Il cognome è obbligatorio';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Il numero di telefono è obbligatorio';
    } else if (!/^[0-9+\s]{8,15}$/.test(phone.trim())) {
      newErrors.phone = 'Inserisci un numero di telefono valido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({ name, surname, phone });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Inserisci i tuoi dati</h2>
        <p className={styles.formDescription}>
          Per completare la configurazione e ricevere il PDF, abbiamo bisogno dei tuoi dati di contatto.
          I tuoi dati saranno utilizzati esclusivamente per contattarti riguardo questa configurazione.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nome *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="Inserisci il tuo nome"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="surname" className={styles.label}>Cognome *</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={styles.input}
              placeholder="Inserisci il tuo cognome"
            />
            {errors.surname && <span className={styles.error}>{errors.surname}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>Numero di telefono *</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              placeholder="Inserisci il tuo numero di telefono"
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>
          
          <div className={styles.formActions}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Annulla
            </button>
            <button type="submit" className={styles.submitButton}>
              Conferma e Scarica PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDataForm;
