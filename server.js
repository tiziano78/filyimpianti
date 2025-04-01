const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());

// Funzione per attendere il caricamento della mappa
async function waitForMapLoad(page) {
    console.log('⏳ Attendo caricamento mappa...');
    
    try {
        // Attendi che il container della mappa sia presente
        console.log('Attendo container mappa...');
        await page.waitForSelector('.mapboxgl-map', { 
            visible: true,
            timeout: 30000 
        });

        // Attendi che la canvas sia presente e visibile
        console.log('Attendo canvas mappa...');
        await page.waitForSelector('.mapboxgl-canvas', { 
            visible: true,
            timeout: 30000 
        });

        // Attendi un momento extra per il rendering completo
        console.log('Attendo rendering finale...');
        await page.waitForTimeout(5000);

        console.log('✅ Mappa caricata con successo!');
        return true;
    } catch (error) {
        console.log('❌ Errore durante attesa mappa:', error);
        throw error;
    }
}

app.get('/screenshot', async (req, res) => {
    let browser = null;
    try {
        // Ottieni il token Mapbox dalla query string
        const token = req.query.token;
        if (!token) {
            throw new Error('Token Mapbox non fornito');
        }
        console.log('Token Mapbox ricevuto');

        // Configurazione ottimizzata di Puppeteer
        console.log('🟢 Avvio browser...');
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--force-device-scale-factor=1',
            ]
        });

        const page = await browser.newPage();
        
        // Configura la viewport
        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        // Abilita i log del browser
        page.on('console', msg => console.log('Browser log:', msg.text()));

        // Carica la pagina con il token
        const url = `http://localhost:3000/mappa?token=${token}`;
        console.log('🟢 Caricamento pagina:', url);
        await page.goto(url, {
            waitUntil: ['networkidle0', 'domcontentloaded'],
            timeout: 30000
        });

        // Attendi il caricamento completo della mappa
        await waitForMapLoad(page);

        console.log('📸 Cattura screenshot...');
        const screenshotBuffer = await page.screenshot({
            type: 'png',
            fullPage: false,
            encoding: 'binary',
            captureBeyondViewport: false,
            omitBackground: false
        });

        // Verifica che lo screenshot sia valido
        if (!screenshotBuffer || screenshotBuffer.length === 0) {
            throw new Error('Screenshot non valido o vuoto');
        }

        console.log('✅ Screenshot catturato con successo!');

        // Imposta gli header appropriati
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Length', screenshotBuffer.length);
        res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"');
        
        // Invia lo screenshot
        res.send(screenshotBuffer);

    } catch (error) {
        console.error('❌ Errore:', error);
        res.status(500).json({
            error: 'Errore durante la cattura dello screenshot',
            details: error.message
        });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('🚀 Server sviluppo attivo su http://localhost:' + PORT);
}); 