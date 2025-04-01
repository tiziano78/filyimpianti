declare module 'jspdf' {
  export default class jsPDF {
    constructor(options?: any);
    addPage(format?: any, orientation?: any): jsPDF;
    text(text: string, x: number, y: number, options?: any): jsPDF;
    setFontSize(size: number): jsPDF;
    setFont(fontName: string, fontStyle?: string): jsPDF;
    setTextColor(r: number, g?: number, b?: number): jsPDF;
    setFillColor(r: number, g?: number, b?: number): jsPDF;
    setDrawColor(r: number, g?: number, b?: number): jsPDF;
    setLineWidth(width: number): jsPDF;
    line(x1: number, y1: number, x2: number, y2: number): jsPDF;
    rect(x: number, y: number, w: number, h: number, style?: string): jsPDF;
    save(filename: string): jsPDF;
    output(type?: string, options?: any): any;
    html(element: HTMLElement | string, options?: any): Promise<jsPDF>;
    addImage(imageData: any, format: string, x: number, y: number, width: number, height: number, alias?: string, compression?: string, rotation?: number): jsPDF;
    // Aggiungi altri metodi secondo necessità
  }
}
