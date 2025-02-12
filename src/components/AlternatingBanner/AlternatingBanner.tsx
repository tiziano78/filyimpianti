"use client";

import Image from "next/image";
import styles from "./AlternatingBanner.module.css";
import InfoFormPopup from "@/components/forms/InfoFormPopup/InfoFormPopup";
import ConfigButton from './ConfigButton/ConfigButton';

interface BannerSection {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  benefits: string[];
  isReversed: boolean;
}

const bannerSections: BannerSection[] = [
  {
    image: "/images/banner.ftv/bannerftv.1.png",
    imageAlt: "Impianto fotovoltaico 3KWp con batteria",
    title: "FTV 3KWp+ BATTERIA DA 5KWh LA TAGLIA PERFETTA PER BASSI CONSUMI:",
    description: `L'impianto fotovoltaico da 3 kWp con storage da 5 kWh è la soluzione ideale per chi ha consumi energetici annui compresi tra 2.700 kWh e 3.300 kWh. Questa configurazione ti permette di risparmiare sulle bollette elettriche e di ridurre l'impatto ambientale, garantendo al contempo un'ottima autonomia energetica.`,
    benefits: [
      "Risparmio Economico: Produci la tua energia e riduci le spese.",
      "Sostenibilità: Utilizza una fonte di energia pulita e rinnovabile.",
      "Autonomia: Grazie allo storage da 5 kWh, usa l'energia quando ne hai bisogno, anche di notte."
    ],
    isReversed: false
  },
  {
    image: "/images/banner.ftv/bannerftv.2.png",
    imageAlt: "Impianto fotovoltaico 4.5KWp con batteria da 10KWh",
    title: "FTV 4,5KWp+ BATTERIE DA 10KWh LA TAGLIA PERFETTA PER CONSUMI MEDI:",
    description: `L'impianto fotovoltaico da 4,5 kWp con storage da 10 kWh è ideale per famiglie con consumi energetici annui compresi tra 3.600 kWh e 4.800 kWh. Questa configurazione ti permette di bilanciare risparmio e sostenibilità, garantendo un'autonomia energetica ottimale.`,
    benefits: [
      "Risparmio Economico: Riduci significativamente le bollette elettriche.",
      "Sostenibilità: Contribuisci alla riduzione delle emissioni di CO2.",
      "Autonomia: Lo storage da 10 kWh ti permette di utilizzare l'energia anche durante le ore serali."
    ],
    isReversed: true
  },
  {
    image: "/images/banner.ftv/bannerftv.3.png",
    imageAlt: "Impianto fotovoltaico 6KWp con batterie da 15KWh",
    title: "FTV 6KWp+ BATTERIE DA 15KWh LA TAGLIA PERFETTA PER FAMIGLIE NUMEROSE:",
    description: `L'impianto fotovoltaico da 6 kWp con storage da 15 kWh è perfetto per famiglie numerose con consumi energetici annui compresi tra 5.200 kWh e 6.800 kWh. Questa soluzione ti offre un'elevata autonomia energetica e un notevole risparmio.`,
    benefits: [
      "Risparmio Economico: Produci la tua energia e riduci le spese.",
      "Sostenibilità: Utilizza una fonte di energia pulita e rinnovabile.",
      "Autonomia: Grazie allo storage da 15 kWh, usa l'energia quando ne hai bisogno, anche di notte."
    ],
    isReversed: false
  },
  {
    image: "/images/banner.ftv/bannerftv.4.png",
    imageAlt: "Impianto fotovoltaico 8KWp con batteria da 20KWh",
    title: "FTV 8KWp+ BATTERIA DA 20KWh LA TAGLIA PERFETTA PER CONSUMI IMPORTANTI:",
    description: `L'impianto fotovoltaico da 8 kWp con storage da 20 kWh è la soluzione ideale per famiglie numerose con consumi energetici annui compresi tra 6.500 kWh e 8.000 kWh. Questa configurazione ti garantisce massima autonomia e risparmio energetico.`,
    benefits: [
      "Risparmio Economico: Riduci drasticamente le bollette elettriche.",
      "Sostenibilità: Contribuisci alla riduzione delle emissioni di CO2.",
      "Autonomia: Lo storage da 20 kWh ti permette di utilizzare l'energia anche durante le ore serali e in caso di blackout."
    ],
    isReversed: true
  }
];

export default function AlternatingBanner() {
  return (
    <div className={styles.bannerWrapper}>
      {bannerSections.map((section, index) => (
        <section key={index} className={styles.contentSection}>
          <div className={`${styles.contentContainer} ${section.isReversed ? styles.reversed : ''}`}>
            <div className={styles.imageSide}>
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                priority={index === 0}
                quality={90}
                className={styles.bannerImage}
                sizes="(max-width: 768px) 100vw, 350px"
              />
              <div className={styles.popupContainer}>
                <ConfigButton />
                <InfoFormPopup />
              </div>
            </div>
            <div className={styles.textSide}>
              <h4>{section.title}</h4>
              <p>{section.description}</p>
              <div className={styles.benefits}>
                <p><strong>⚡PERCHÉ SCEGLIERE QUESTO IMPIANTO?</strong></p>
                {section.benefits.map((benefit, idx) => (
                  <p key={idx}><strong>⚡{benefit}</strong></p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}