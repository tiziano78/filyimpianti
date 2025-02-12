// Prima installa il pacchetto plaiceholder
import sharp from 'sharp'
import { getPlaiceholder } from 'plaiceholder'
import path from 'path'
import fs from 'fs/promises'

interface OptimizedImage {
  width: number
  height: number
  blurDataUrl: string
  originalPath: string
  webpPath: string
}

export async function optimizeImage(
  imagePath: string,
  outputDir: string,
  options = { width: 1200 }
): Promise<OptimizedImage> {
  try {
    // Verifica se la directory di output esiste
    await fs.mkdir(outputDir, { recursive: true })

    const image = sharp(imagePath)
    const metadata = await image.metadata()

    if (!metadata.width || !metadata.height) {
      throw new Error('Impossibile leggere le dimensioni dell\'immagine')
    }

    // Calcola le dimensioni mantenendo l'aspect ratio
    const aspectRatio = metadata.width / metadata.height
    const newWidth = Math.min(options.width, metadata.width)
    const newHeight = Math.round(newWidth / aspectRatio)

    // Leggi il file come buffer
    const imageBuffer = await fs.readFile(imagePath)
    // Genera il placeholder blur
    const { base64: blurDataUrl } = await getPlaiceholder(imageBuffer)

    // Genera il nome del file webp
    const originalFileName = path.basename(imagePath)
    const webpFileName = `${path.parse(originalFileName).name}.webp`
    const webpPath = path.join(outputDir, webpFileName)

    // Ottimizza e converte in webp
    await image
      .resize(newWidth, newHeight)
      .webp({ quality: 80 })
      .toFile(webpPath)

    return {
      width: newWidth,
      height: newHeight,
      blurDataUrl,
      originalPath: imagePath,
      webpPath: webpPath.replace(process.cwd(), '')
    }
  } catch (error) {
    console.error('Errore durante l\'ottimizzazione dell\'immagine:', error)
    throw error
  }
}

export async function optimizeImages(
  imagesPaths: string[],
  outputDir: string
): Promise<OptimizedImage[]> {
  const optimizationPromises = imagesPaths.map(imagePath => 
    optimizeImage(imagePath, outputDir)
  )

  try {
    return await Promise.all(optimizationPromises)
  } catch (error) {
    console.error('Errore durante l\'ottimizzazione delle immagini:', error)
    throw error
  }
}

// Funzione per generare srcset per immagini responsive
export function generateSrcSet(
  imagePath: string,
  widths: number[] = [320, 640, 768, 1024, 1200]
): string {
  return widths
    .map(width => `${imagePath}?w=${width} ${width}w`)
    .join(', ')
}