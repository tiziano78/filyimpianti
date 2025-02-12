export async function loadLegacyModule(modulePath: string) {
  try {
    const module = await import(modulePath);
    return module.default || module;
  } catch (error) {
    console.error(`Errore nel caricamento del modulo: ${modulePath}`, error);
    throw error;
  }
}

// Utility per monitorare le performance dei moduli
export const moduleLoadingMetrics = {
  start: (moduleName: string) => {
    performance.mark(`${moduleName}-start`);
  },
  end: (moduleName: string) => {
    performance.mark(`${moduleName}-end`);
    performance.measure(
      `${moduleName}-load`,
      `${moduleName}-start`,
      `${moduleName}-end`
    );
  }
}; 