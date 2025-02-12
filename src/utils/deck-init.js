// deck.gl init semplificato
import { registerLoaders } from '@loaders.gl/core';
import { ImageLoader } from '@loaders.gl/images';
import log from '@deck.gl/core/dist/lib/utils/log';
import { register } from '@deck.gl/core/dist/lib/debug';

const version = '9.1.0';

// Registra i loader necessari
registerLoaders([ImageLoader]);

// Inizializza deck.gl con i loader
globalThis.deck = {
  VERSION: version,
  version,
  log,
  _registerLoggers: register,
  registerLoaders
};

export const VERSION = version;
export { registerLoaders };
export { ImageLoader }; 